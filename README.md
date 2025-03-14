<h2 align='center'>@samatech/vue-color-picker</h2>

<p align='center'>Vue color picker component</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@samatech/vue-color-picker'>
  <img src='https://img.shields.io/npm/v/@samatech/vue-color-picker?color=222&style=flat-square'>
</a>
</p>

<br>

## Instructions

### Install

```bash
npm i -S @samatech/vue-color-picker
```

### Usage

Displays the picker and updates refs on color/gradient selection. See `packages/demo` for a slightly more advanced example.

```Vue
<template>
  <ColorPicker
    :color="selectedColor"
    :gradient="selectedGradient"
    :forceNonGradient="false"
    :selectedThemeColors="themeColors"
    @selectColor="selectColor"
    @update="update"
    @applyGradient="applyGradient"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ColorPicker,
  IPickerColor,
  IThemedGradient,
  IThemeColor,
  IRgba,
} from '@samatech/vue-color-picker'
import '@samatech/vue-color-picker/dist/style.css'

const selectedColor = ref<string | undefined>()
const selectedGradient = ref()
const themeColors = ref<IThemeColor[]>([])

const getRgba = (color: IPickerColor | undefined) => {
  if (color) {
    const { r, g, b, a } = color.rgba
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return undefined
}

const update = (color: IPickerColor | IThemedGradient | undefined) => {
  if (color && 'raw' in color) {
    selectedGradient.value = color.raw
    selectedColor.value = undefined
  } else {
    selectedColor.value = getRgba(color)
    selectedGradient.value = undefined
  }
}

const addThemeColor = (color: string | undefined) => {
  if (color && !themeColors.value.find((c) => c.key === color)) {
    themeColors.value.push({ key: color, value: color })
  }
}

const selectColor = (color: IPickerColor | undefined) => {
  selectedColor.value = getRgba(color)
  selectedGradient.value = undefined
  addThemeColor(selectedColor.value)
}

const applyGradient = (gradient: IThemedGradient | undefined) => {
  selectedGradient.value = gradient?.raw
  selectedColor.value = undefined
}
</script>
```

## Development

We use [PNPM](https://pnpm.io/) workspaces for development

```bash
# Clone
git clone git@github.com:samatechtw/vue-color-picker
cd vue-color-picker

# Install dependencies
pnpm install

# Build library
pnpm run build

# Run example site
pnpm run demo
```

## License

MIT License © 2021 - 2025 [SamaTech Limited Company](https://github.com/samatechtw)
