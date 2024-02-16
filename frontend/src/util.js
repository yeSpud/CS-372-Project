const characterMin = function (node, length) {
  return node.value.length >= length
}

characterMin.blocking = true
characterMin.skipEmpty = false
characterMin.debounce = 20
characterMin.force = true

export default characterMin
