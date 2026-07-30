export enum ResultEnum {
  // 0和200当做成功都很普遍，这里直接兼容两者（PS：0和200通常都不会当做错误码，但是有的接口会返回0，有的接口会返回200）
  Success0 = 0, // 成功
  Success200 = 200, // 成功
  Error = 400, // 错误
  Unauthorized = 401, // 未授权
  Forbidden = 403, // 禁止访问（原为forbidden）
  NotFound = 404, // 未找到（原为notFound）
  MethodNotAllowed = 405, // 方法不允许（原为methodNotAllowed）
  RequestTimeout = 408, // 请求超时（原为requestTimeout）
  InternalServerError = 500, // 服务器错误（原为internalServerError）
  NotImplemented = 501, // 未实现（原为notImplemented）
  BadGateway = 502, // 网关错误（原为badGateway）
  ServiceUnavailable = 503, // 服务不可用（原为serviceUnavailable）
  GatewayTimeout = 504, // 网关超时（原为gatewayTimeout）
  HttpVersionNotSupported = 505, // HTTP版本不支持（原为httpVersionNotSupported）
}

export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum HttpErrorType {
  Business = 'business',
  Auth = 'auth',
  Http = 'http',
  Network = 'network',
}
