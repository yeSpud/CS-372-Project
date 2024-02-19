// defines a Pinia store named "counter", can increment the count and has a doublecount property

import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
