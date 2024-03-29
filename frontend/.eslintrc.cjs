/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  plugins: [
    "simple-import-sort",
    "unused-imports"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "arrow-spacing": "error",
    "quotes": [
      "error",
      "double",
      {
        "avoidEscape": true
      }
    ],
    "no-mixed-spaces-and-tabs": "error",
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "func-call-spacing": [
      "error",
      "never"
    ],
    "function-call-argument-newline": [
      "error",
      "consistent"
    ],
    "function-paren-newline": [
      "error",
      "multiline-arguments"
    ],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 0
      }
    ],
    "no-trailing-spaces": "error",
    "comma-dangle": [ "error", "never" ],
    "no-whitespace-before-property": "error",
    "semi": [
      "error",
      "never"
    ],
    "semi-style": [
      "error",
      "first"
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "block-spacing": [
      "error",
      "always"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-curly-newline": [
      "error",
      {
        "consistent": true,
        "multiline": true
      }
    ],
    "object-property-newline": [
      "error",
      {
        "allowAllPropertiesOnSameLine": true
      }
    ],
    "eqeqeq": [
      "error",
      "always",
      {
        "null": "ignore"
      }
    ],
    "spaced-comment": [
      "error",
      "always",
      {
        "markers": [
          "!"
        ]
      }
    ],
    "yoda": "error",
    "prefer-destructuring": [
      "error",
      {
        "object": true,
        "array": true
      }
    ],
    "operator-assignment": [
      "error",
      "always"
    ],
    "no-useless-computed-key": "error",
    "no-unneeded-ternary": [
      "error",
      {
        "defaultAssignment": false
      }
    ],
    "no-invalid-regexp": "error",
    "no-constant-condition": [
      "error",
      {
        "checkLoops": false
      }
    ],
    "no-duplicate-imports": "error",
    "no-extra-semi": "error",
    "consistent-return": [
      "warn",
      {
        "treatUndefinedAsUnspecified": true
      }
    ],
    "dot-notation": "error",
    "no-useless-escape": "error",
    "no-fallthrough": "error",
    "for-direction": "error",
    "no-async-promise-executor": "error",
    "no-cond-assign": "error",
    "no-dupe-else-if": "error",
    "no-duplicate-case": "error",
    "no-irregular-whitespace": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-shadow-restricted-names": "error",
    "no-unexpected-multiline": "error",
    "no-unsafe-optional-chaining": "error",
    "no-useless-backreference": "error",
    "use-isnan": "error",
    "prefer-const": "error",
    "prefer-spread": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports": "error"
  }
}
