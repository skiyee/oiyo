/**
 * 扩展 oiyo 的请求配置：给所有 http 实例的 options 追加 hideErrorToast。
 * @see https://oiyo.js.org/docs/manual/data/http#拓展请求配置
 */
declare module '@skiyee/oiyo/runtime' {
  interface HttpCommonOptions {
    /** 出错时是否隐藏错误提示（默认 false，即自动 toast） */
    hideErrorToast?: boolean;
  }
}

export interface IHttpError<T = any> {
  type: 'business' | 'auth' | 'http' | 'network';
  code?: number;
  statusCode?: number;
  message: string;
  data?: T;
  raw?: unknown;
}

// 通用响应格式（兼容 msg + message 字段）
export type IResponse<T = any> = {
  code: number;
  data: T;
  message: string;
  [key: string]: any; // 允许额外属性
} | {
  code: number;
  data: T;
  msg: string;
  [key: string]: any; // 允许额外属性
}
