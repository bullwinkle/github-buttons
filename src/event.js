export const onEvent = function (target, eventName, func) {
  /* istanbul ignore else: IE lt 9 */
  if (target.addEventListener) {
    target.addEventListener(eventName, func)
  } else {
    target.attachEvent('on' + eventName, func)
  }
}

export const offEvent = function (target, eventName, func) {
  /* istanbul ignore else: IE lt 9 */
  if (target.removeEventListener) {
    target.removeEventListener(eventName, func)
  } else {
    target.detachEvent('on' + eventName, func)
  }
}

export const onceEvent = function (target, eventName, func) {
  const callback = function (event) {
    offEvent(target, eventName, callback)
    return func(event)
  }
  onEvent(target, eventName, callback)
}

export const onceReadyStateChange = /* istanbul ignore next: IE lt 9 */ function (target, regex, func) {
  const eventName = 'onreadystatechange'
  const callback = function (event) {
    if (regex.test(target.readyState)) {
      target.detachEvent(eventName, callback)
      return func(event)
    }
  }
  target.attachEvent(eventName, callback)
}
