# 请求库

本项目只保留一套请求层，基于 oiyo 内置请求器（[`createHttp`](https://oiyo.js.org/docs/api/utils/create-http)）创建的公共实例 `client`，位于 `src/http/client.ts`。

不再二次封装 `request`/`upload`，也没有 `http.get/post` 之类的别名——直接使用 `client`。项目特有的业务逻辑全部收敛在 `createHttp` 的生命周期钩子里：

- `onRequest`：请求前注入鉴权 token
- `onResponse`（2xx）/ `onResponseError`（非 2xx）：业务错误码判定、解包业务 `data`、错误 toast、401 无感刷新
- `onRequestError`：网络错误 toast + 统一 `HttpError`

请求选项、重试、中断、上传/下载等能力全部沿用 oiyo 原生配置，详见[官方文档](https://oiyo.js.org/docs/manual/data/http)。

## 如何使用

直接调用 `client.request`，钩子会在成功时把响应精炼为内层业务 `data`，所以 `client.request<T>()` 直接拿到 `T`：

```ts
import { client } from '~/apis/http/client'

interface IUserInfoRes {
  id: number
  nickname: string
}

export function getUserInfo() {
  return client.request<IUserInfoRes>('/user/info')
}

export function updateUserInfo(data: Partial<IUserInfoRes>) {
  return client.request('/user/update', { method: 'POST', body: data })
}
```

`method`、`body`、`query` 等都是 oiyo 原生选项，无需记忆额外的封装签名。

响应成功时返回业务 `data`；业务错误、登录失效、HTTP 状态码异常和网络异常会统一 reject `HttpError`：

```ts
import type { HttpError } from '~/http/types'

try {
  const userInfo = await getUserInfo()
  console.log(userInfo.nickname)
}
catch (error) {
  const httpError = error as HttpError
  console.log(httpError.type, httpError.message, httpError.statusCode)
}
```

如果调用方需要自行处理错误提示，可以传入 `hideErrorToast: true`（该字段通过[拓展 `HttpCommonOptions`](https://oiyo.js.org/docs/manual/data/http#拓展请求配置) 注入，见 `src/http/types.ts`）：

```ts
client.request<IUserInfoRes>('/user/info', { hideErrorToast: true })
```

## 上传、下载、中断、派生实例

这些都是 oiyo 原生能力，直接用 `client`：

```ts
import { client } from '~/apis/http/client'

// 文件上传（body 对应 formData），响应同样会走钩子解包为业务 data
client.upload('/upload', { filePath, name: 'file', body: { category: 'avatar' } })

// 文件下载
const { tempFilePath } = await client.download('/file/report.pdf')

// 中断进行中的请求（createHttpAborter 由 oiyo 自动导入）
const aborter = createHttpAborter()
client.request('/pet/1', { signal: aborter.signal })
aborter.abort()

// 派生一个新实例（覆盖超时等配置，公共实例的钩子会一并串联执行）
const longTimeoutClient = client.create({ timeout: 120000 })
```
