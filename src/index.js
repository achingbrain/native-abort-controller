'use strict'

let impl

if (typeof globalThis !== "undefined" && globalThis.AbortController && globalThis.AbortSignal) {
  impl = globalThis
} else {
  impl = require('abort-controller')
}

module.exports = {
  AbortController: impl.AbortController,
  AbortSignal: impl.AbortSignal
}
