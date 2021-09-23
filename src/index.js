'use strict'

let impl

if (typeof globalThis !== 'undefined' && globalThis.AbortController && globalThis.AbortSignal) {
  impl = globalThis
} else {
  impl = require('abort-controller')
}

module.exports.AbortSignal = impl.AbortSignal
module.exports.AbortController = impl.AbortController
