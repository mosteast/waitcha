import {
  print_error,
  print_info,
  print_success,
  print_verbose,
} from './printer';

export async function wait(fn: () => Promise<any>, state: T_waiter_state): Promise<void> {
  state = {
    count: 0,
    interval: 1000,
    max_retry: 12,
    mute: false,
    forever: false,
    ...state,
  };

  if (state.count === 1) {
    print_info('Wait started.');
  }

  state.count++;

  if (!state.forever && state.count > state.max_retry) {
    print_error(`Wait failed after retried ${state.max_retry} times.`);
    return Promise.reject();
  }

  if (state.count > 1 && !state.mute) {print_verbose(`Retry: ${state.count}`);}

  try {
    await fn();
  } catch (e) {
    await delay(state?.interval);
    await wait(fn, state);
    return;
  }

  if (state.count > 1) {
    print_success('Wait fulfilled.');
  }

  return Promise.resolve();
}

function delay(t: number, value?: any) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, value), t);
  });
}

export interface T_waiter_state {
  interval: number,
  max_retry: number,
  count: number,
  mute?: boolean
  forever?: boolean
}
