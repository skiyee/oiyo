import {
  defineConfig,
  presetUni,
  transformerDirectives,
  transformerVariantGroup,
} from 'uni-unocss'

export default defineConfig({
  presets: [
    presetUni(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
