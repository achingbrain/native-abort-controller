'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const { AbortController: NativeAbortController } = require('../src')
const { AbortController: AbortControllerPollyfill } = require('abort-controller')

let nodeVersion

if (globalThis.process && globalThis.process.version) {
  nodeVersion = parseInt(globalThis.process.version.match(/v(\d+)\./)[1], 10)
}

describe('env', function () {
  it('AbortController should be correct in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(NativeAbortController).to.equal(AbortControllerPollyfill)
        expect(new NativeAbortController()).to.be.instanceOf(AbortControllerPollyfill)
        expect(globalThis.AbortController).to.be.undefined()
        break
      case 'electron-renderer':
        expect(NativeAbortController).to.not.equal(AbortControllerPollyfill)
        expect(new NativeAbortController()).to.be.instanceOf(globalThis.AbortController)
        expect(globalThis.AbortController).to.be.ok()
        break
      case 'node':
        if (nodeVersion < 15) {
          expect(NativeAbortController).to.equal(AbortControllerPollyfill)
          expect(new NativeAbortController()).to.be.instanceOf(AbortControllerPollyfill)
          expect(globalThis.AbortController).to.be.undefined()
        } else {
          // node 15+ gets native AbortController
          expect(NativeAbortController).to.not.equal(AbortControllerPollyfill)
          expect(new NativeAbortController()).to.be.instanceOf(globalThis.AbortController)
          expect(globalThis.AbortController).to.be.ok()
        }
        break
      case 'browser':
        expect(NativeAbortController).to.not.equal(AbortControllerPollyfill)
        expect(new NativeAbortController()).to.be.instanceOf(globalThis.AbortController)
        expect(globalThis.AbortController).to.be.ok()
        break
      case 'webworker':
        expect(NativeAbortController).to.not.equal(AbortControllerPollyfill)
        expect(new NativeAbortController()).to.be.instanceOf(globalThis.AbortController)
        expect(globalThis.AbortController).to.be.ok()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })
})
