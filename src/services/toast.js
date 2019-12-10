const singleton = Symbol('toast-singleton')
const singletonEnforcer = Symbol('toast-singleton-enforcer')

class ToastService {
  toastRef = null

  constructor (enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }

    this._type = 'ToastService'
  }

  static get instance () {
    if (!this[singleton]) {
      this[singleton] = new ToastService(singletonEnforcer)
    }

    return this[singleton]
  }

  static init (reference) {
    ToastService.instance.toastRef = reference
  }

  static showMessage (title = '', description = '') {
    ToastService.instance.toastRef.showMessage({ title, description })
  }

  static hideMessage () {
    ToastService.instance.toastRef.hideMessage()
  }
}

export default ToastService
