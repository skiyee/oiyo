import { client } from '~/apis/http/client'

/**
 * 统一的文件上传 composable。
 *
 * 底层走 ~/apis/http/client 的 client.upload：token 自动注入、baseURL 自动拼接、响应自动解析并返回业务 data。
 * 支持选图（chooseImage / chooseMedia）、选任意文件（chooseFile）、直接传文件路径、上传进度。
 *
 * @example
 * const { loading, error, data, progress, run } = useUpload<IUploadResult>({
 *   url: '/upload',
 *   maxSize: 5, // 最大 5MB
 *   sourceType: ['album'],
 *   onProgress: p => console.log(`上传进度：${p}%`),
 *   onSuccess: res => console.log('上传成功', res),
 *   onError: err => console.error('上传失败', err),
 * })
 * // 触发选择并上传
 * run()
 */

/** 上传文件的 URL 配置（相对路径，baseURL 由 ~/apis/http/client 统一拼接） */
export const uploadFileUrl = {
  /** 用户头像上传地址 */
  USER_AVATAR: '/user/avatar',
  /** 通用上传地址 */
  COMMON: '/upload',
}

export interface UseUploadOptions<T = string> {
  /** 上传地址（相对路径，baseURL 由 client 统一拼接） */
  url: string;
  /** 附带的表单数据 */
  formData?: Record<string, any>;
  /** 文件大小限制，单位：MB，默认 10 */
  maxSize?: number;
  /** 最大可选择的文件数量，默认 1 */
  count?: number;
  /** 所选图片的尺寸，original-原图，compressed-压缩图 */
  sizeType?: Array<'original' | 'compressed'>;
  /** 选择图片的来源，album-相册，camera-相机 */
  sourceType?: Array<'album' | 'camera'>;
  /** 文件类型：image-图片（默认），file-任意文件 */
  fileType?: 'image' | 'file';
  /** 直接传入文件路径，跳过选择器 */
  directFilePath?: string;
  /** 上传进度回调（0-100） */
  onProgress?: (progress: number) => void;
  /** 上传成功回调 */
  onSuccess?: (data: T) => void;
  /** 上传失败回调 */
  onError?: (err: any) => void;
  /** 上传完成回调（无论成功失败） */
  onComplete?: () => void;
}

export interface UseUploadReturn<T> {
  /** 上传中状态 */
  loading: Ref<boolean>;
  /** 上传错误状态 */
  error: Ref<any>;
  /** 上传成功后的响应数据 */
  data: Ref<T | undefined>;
  /** 上传进度（0-100） */
  progress: Ref<number>;
  /** 触发文件选择并上传 */
  run: () => void;
}

export function useUpload<T = string>(options: UseUploadOptions<T>): UseUploadReturn<T> {
  const {
    url,
    formData = {},
    maxSize = 10,
    count = 1,
    sizeType = ['original', 'compressed'],
    sourceType = ['album', 'camera'],
    fileType = 'image',
    directFilePath,
    onProgress,
    onSuccess,
    onError,
    onComplete,
  } = options

  const loading = ref(false)
  const error = ref<any>(null)
  const data = ref<T>() as Ref<T | undefined>
  const progress = ref(0)

  /** 检查文件大小是否超过限制（maxSize 单位 MB） */
  const checkFileSize = (size: number) => {
    const sizeInMB = size / 1024 / 1024
    if (sizeInMB > maxSize) {
      uni.showToast({
        title: `文件大小不能超过 ${maxSize}MB`,
        icon: 'none',
      })
      return false
    }
    return true
  }

  /** 执行上传（底层走统一请求层 upload） */
  const doUpload = (tempFilePath: string) => {
    loading.value = true
    progress.value = 0
    client.upload<T>(url, {
      filePath: tempFilePath,
      name: 'file',
      // oiyo upload 的 body 对应 formData
      body: formData,
      onProgress: (res) => {
        progress.value = res.progress
        onProgress?.(res.progress)
      },
    })
      .then((res) => {
        // 钩子已自动解析响应并返回业务 data
        data.value = res
        onSuccess?.(res)
      })
      .catch((err) => {
        error.value = err
        onError?.(err)
      })
      .finally(() => {
        loading.value = false
        onComplete?.()
      })
  }

  const run = () => {
    // 直接传入文件路径时，跳过选择器
    if (directFilePath) {
      doUpload(directFilePath)
      return
    }

    // 选任意文件
    if (fileType === 'file') {
      uni.chooseFile({
        count,
        type: 'all',
        success: (res: any) => {
          const file = res.tempFiles[0]
          if (file?.size !== undefined && !checkFileSize(file.size)) {
            return
          }
          doUpload(res.tempFilePaths[0])
        },
        fail: (err) => {
          console.error('选择文件失败:', err)
          error.value = err
          onError?.(err)
        },
      })
      return
    }

    // 选图片：微信小程序用 chooseMedia，其他平台用 chooseImage
    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count,
      mediaType: ['image'],
      sourceType,
      success: (res) => {
        const file = res.tempFiles[0]
        if (!checkFileSize(file.size)) {
          return
        }
        doUpload(file.tempFilePath)
      },
      fail: (err) => {
        console.error('选择媒体文件失败:', err)
        error.value = err
        onError?.(err)
      },
    })
    // #endif

    // #ifndef MP-WEIXIN
    uni.chooseImage({
      count,
      sizeType,
      sourceType,
      success: (res) => {
        // res.tempFiles 在不同平台为 File | File[]，统一规整为数组再取首个
        const tempFiles = Array.isArray(res.tempFiles) ? res.tempFiles : [res.tempFiles]
        const size = (tempFiles[0] as { size?: number })?.size
        if (size !== undefined && !checkFileSize(size)) {
          return
        }
        doUpload(res.tempFilePaths[0])
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
        error.value = err
        onError?.(err)
      },
    })
    // #endif
  }

  return { loading, error, data, progress, run }
}

/**
 * 便捷函数：直接传入文件路径上传（跳过选择器，仅相册来源、原图）。
 * @param url 上传地址（相对路径）
 * @param filePath 本地文件路径
 * @param formData 额外表单数据
 * @param options 其他上传选项
 */
export function useFileUpload<T = string>(
  url: string,
  filePath: string,
  formData: Record<string, any> = {},
  options: Omit<UseUploadOptions<T>, 'url' | 'formData' | 'directFilePath' | 'sourceType' | 'sizeType' | 'count' | 'fileType'> = {},
) {
  return useUpload<T>({
    ...options,
    url,
    formData,
    directFilePath: filePath,
    sourceType: ['album'],
    sizeType: ['original'],
  })
}

export default useUpload
