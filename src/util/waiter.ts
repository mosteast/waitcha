import { print_error, print_success, print_verbose } from './printer'

export async function waiter(fn: () => Promise<any>, state?: T_waiter_state) {
  state = {
    count: 0,
    interval: 1000,
    max_retry: 12,
    mute: false,
    ...state,
  }

  state.count++

  if (state.count > state.max_retry) {return print_error(`Wait failed after retried ${ state.max_retry } times.`)}

  if (state.count > 1 && !state.mute) {print_verbose(`Retry: ${ state.count }`)}

  fn().then(r => {
    print_success('Wait fulfilled.')
  }).catch(e => {
    const timer = setTimeout(async () => {
      await waiter(fn, state)
      clearTimeout(timer)
    }, state?.interval)
  })
}

export interface T_waiter_state {
  interval: number,
  max_retry: number,
  count: number,
  mute?: boolean
}
