// custom functions for username and password requrements

const characterMin = function (node, length) {
  if (node.value == null) {
    return false
  }
  return node.value.length >= length
}
characterMin.blocking = true
characterMin.skipEmpty = false
characterMin.debounce = 20
characterMin.force = true

const customLowercase = function (node) {
  if (node.value == null) {
    return false
  }
  const customLowercaseRegex = RegExp("^[a-z_]*$")
  return customLowercaseRegex.test(node.value)
}
customLowercase.blocking = true
customLowercase.skipEmpty = false
customLowercase.debounce = 20
customLowercase.force = true

const characterCount = function (node, character, min, max) {
  if (node.value == null) {
    return false
  }
  const characterOccurrence = node.value.split(character).length - 1
  return characterOccurrence >= min && characterOccurrence <= max
}
characterCount.blocking = true
characterCount.skipEmpty = false
characterCount.debounce = 20
characterCount.force

export { characterCount, characterMin, customLowercase }
