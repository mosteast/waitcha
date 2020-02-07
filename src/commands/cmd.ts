import { Command, flags } from '@oclif/command'
import { print_error, print_info } from '../util/printer'
import * as Parser from '@oclif/parser'
import { T_waiter_state, waiter } from '../util/waiter'
import { command } from '@mosteast/command'

export default class Cmd extends Command {
  static description = 'wait for a command to fulfill'

  static usage = [
    'cmd "ls test.log"',
    'cmd "ls test.log" --interval 2000 --max_retry 10',
    'cmd "ls test.log" -i 2000 -m 10',
    'cmd "ls test.log" -i 2000',
    'cmd "ls test.log" -i 2000 [&& ANOTHER_WAITCHA && ...]',
  ]

  static flags: flags.Input<any> = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)

    inherit_stdio: flags.boolean({
      default: false,
      description: 'Whether to print std output or accept input',
    }),

    mute: flags.boolean({
      default: false,
      description: 'Whether to print Retry information',
    }),

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

  static args: Parser.args.IArg[] = [
    {
      name: 'command',
      required: true,
    },
  ]

  opt = {
    retry: 0,
  }

  async run() {
    const { args, flags } = this.parse(Cmd)

    const cmd = args.command
    print_info('Wait started.')

    if (!cmd) {
      return print_error(`Please pass a command to wait: $0 '<COMMAND>' ...`)
    }

    const state: T_waiter_state = {
      interval: flags.interval,
      max_retry: flags.max_retry,
      count: 0,
    }

    await waiter(async () => {
      let opt

      if (!flags.inherit_stdio) {
        opt = { stdio: [ 'inherit', 'ignore', 'ignore' ] }
      }

      const r = await command(cmd, opt)

      if (r.code) {
        throw new Error('Not fulfilled')
      } else {
        return true
      }
    }, state)
  }
}
