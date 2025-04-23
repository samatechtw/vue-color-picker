import { IRgba } from '../types'

export function getRgbaCss(rgba: IRgba): string
export function getRgbaCss(rgba: IRgba | undefined): undefined

export function getRgbaCss(rgba?: IRgba): string | undefined {
  if (rgba) {
    const { r, g, b, a } = rgba
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return undefined
}
