import Sentry from '@sentry/node';

import Tracing from '@sentry/tracing';
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: 'https://627d416cb307440090b132b392694118@o995208.ingest.sentry.io/5954013',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: 'test',
  name: 'My First Test Transaction',
});

const foo = new Promise((resolve: any, reject: any) => {
  setTimeout(() => {
    reject('foo');
  }, 300);
});
setTimeout(() => {
  try {
    foo;
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
