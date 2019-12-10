import isClient from '../util/is-client'

export const Command = {
  Send: 'send',
  Set: 'set',
}

const canUse = () => isClient() && Boolean(window.ga)

const ga = (command, ...args) => {
  if (canUse()) {
    return window.ga(command, ...args)
  }
}

const gaCallback = func => {
  if (canUse()) {
    return window.ga(func)
  }
}

export const getClientId = () => {
  let id
  gaCallback(tracker => {
    id = tracker.get('clientId')
  })
  return id || null
}

export const setUserId = userId => ga(Command.Set, 'userId', userId)
