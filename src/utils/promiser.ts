/**
 * 阻止一段时间再运行
 *
 * @param ms 延迟时间 (单位：毫秒 | 默认: 300)
 */
export function sleep(ms = 300) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}
