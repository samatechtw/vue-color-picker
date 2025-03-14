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

#### Undefined handling

If a state field is set to `undefined`, it will not appear in the flattened module, or be saved with the LocalStoragePlugin. It is recommended to use `null` instead, and make use of strict type checking to avoid accidentally setting fields to `undefined`. It is possible to add `undefined` support to the LocalStoragePlugin, please file a feature request or submit a PR if you need this functionality.

### Plugins

Plugins can help initialize state, and operate on state when it changes. A basic [LocalStoragePlugin](./lib/plugins.ts) is provided for persisting a module's state to browser storage.

Writing plugins is straightforward, just provide an object conforming to IPlugin, or a function that accepts a module parameter and returns IPlugin.

```ts
interface IPlugin<S extends IState> {
  // Called when the module is initialized
  onStateInit?: (state: S) => S
  // Called any time the module's state changes
  onDataChange?: WatchCallback<UnwrapNestedRefs<S>, UnwrapNestedRefs<S> | undefined>
}

interface MyState {
  dots: string
}

const dummyPlugin: IPlugin<MyState> = {
  onDataChange: (value) => {
    value.dots += '.'
  },
}
```

## Environment

TODO -- details about using alongside other versions of @vue/reactivity

## Example

See the [`example`](./example) folder.

## Development

We use [PNPM](https://pnpm.io/) workspaces for development

```bash
# Clone
git clone git@github.com:samatechtw/vue-store
cd vue-store

# Install dependencies
pnpm install

# Run example
pnpm run all:dev

# Build
pnpm run build
```

## License

MIT License © 2021 - 2025 [SamaTech Limited Company](https://github.com/samatechtw)
