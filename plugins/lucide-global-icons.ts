import {
  ChevronDown,
  Hash,
  Menu,
  Moon,
  Sun,
  X
} from '@lucide/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('LucideChevronDown', ChevronDown)
  nuxtApp.vueApp.component('LucideHash', Hash)
  nuxtApp.vueApp.component('LucideMenu', Menu)
  nuxtApp.vueApp.component('LucideMoon', Moon)
  nuxtApp.vueApp.component('LucideSun', Sun)
  nuxtApp.vueApp.component('LucideX', X)
})
