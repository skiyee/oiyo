/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string;
  /** 默认后台接口地址 */
  readonly VITE_SERVER_BASEURL: string;
  /** 微信小程序开发版后台接口地址，不配置则回退使用 VITE_SERVER_BASEURL */
  readonly VITE_SERVER_BASEURL__WEIXIN_DEVELOP?: string;
  /** 微信小程序体验版后台接口地址，不配置则回退使用 VITE_SERVER_BASEURL */
  readonly VITE_SERVER_BASEURL__WEIXIN_TRIAL?: string;
  /** 微信小程序正式版后台接口地址，不配置则回退使用 VITE_SERVER_BASEURL */
  readonly VITE_SERVER_BASEURL__WEIXIN_RELEASE?: string;
  /** H5 是否开启代理 */
  readonly VITE_APP_PROXY_ENABLE: 'true' | 'false';
  /** H5 代理前缀 */
  readonly VITE_APP_PROXY_PREFIX: string;
  /** 认证模式，'single' | 'double' ==> 单token | 双token */
  readonly VITE_AUTH_MODE: 'single' | 'double';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
