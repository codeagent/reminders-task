/// <reference lib="webworker" />


import * as moment from 'moment';

let reminders = [];
addEventListener('message', ({ data }) => {
  reminders = data.data;
});

function findActive(reminders) {
  const result = [];
  if (!reminders || reminders.length === 0) {
    return result;
  }
  const now = moment();
  for (const r of reminders) {
    const date = moment(r.date);
    const diff = date.diff(now);
    if (diff <= 1005 && diff >= 0) {
      result.push(r);
    }
  }
  return result;
}


// main loop
setInterval(() => {
  const active = findActive(reminders);
  active.forEach(e => postMessage(e));
}, 1000);


