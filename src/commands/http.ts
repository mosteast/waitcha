import { Command, flags } from '@oclif/command'
import { T_waiter_state } from '../util/waiter'

export default class Http extends Command {
  static description = 'wait for a http request to fulfill'

  static usage = [
    'http google.com',
    'http http://google.com',
    'http https://google.com',
    'http https://google.com:80',
    'http google.com --interval 2000 --max_retry 10',
    'http google.com -i 2000 -m 10',
    'http google.com -i 2000',
  ]

  static flags: flags.Input<any> = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)

    interval: flags.integer({
      char: 'i',
      default: 1000,
      description: 'Retry interval in milliseconds',
    }),

    max_retry: flags.integer({
      char: 'm',
      default: 12,
      description: 'Max retry limit.',
    }),
  }

  async run() {
    const { args, flags } = this.parse(Http)

    const state: T_waiter_state = {
      interval: flags.interval,
      max_retry: flags.max_retry,
      count: 0,
    }

    fetch()
  }
}
