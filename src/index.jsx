import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import * as Sentry from '@sentry/browser'
import App from './App'
import { version } from '../package.json'

const env = process.env.NODE_ENV || 'development'

console.log(env)

if (env !== 'development') {
  LogRocket.init('j6kw7s/curate')
  Sentry.init({
    dsn: 'https://4fa25895b67f4d518a5b302e6dbeab11@sentry.io/1387545',
    environment: (window._env_ && window._env_.KNOT_ENV) || 'dev',
    beforeSend (event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({
          eventId: event.event_id,
        })
      }
      return event
    },
    release: `curateid@${version}`,
  })
} else {
  console.log('ENV = development. Sentry not loaded')
}

ReactDOM.render(<App />, document.getElementById('root'))
