import { Command, flags } from '@oclif/command'
import { command } from '@mosteast/command'
import { print_error, print_verbose } from '../util/printer'
import * as Parser from '@oclif/parser'

export default class Cmd extends Command {
  static description = 'wait for a command to fulfill'

  static usage = [
    'cmd <COMMAND>',
    'cmd <COMMAND> [OPTIONS]',
  ]

  static flags: flags.Input<any> = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)

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
    const interval: number = <number>flags.interval || 1000
    const max = <number>flags.max_retry || 12
    let count = 0

    run()

    async function run() {

      if (!cmd) {return print_error(`Please pass a command to wait: $0 '<cmd>' [ --interval=ms | max=int ]`)}

      count++
      if (count > max) {return print_error(`Wait failed after retried ${ max } times.`)}
      if (count > 1) { print_verbose(`Retry: ${ count }`) }

      const r = await command(cmd, { stdio: [ 'inherit', 'ignore', 'ignore' ] })
      if (r.code) {
        const timer = setTimeout(async () => {
          await run()
          clearTimeout(timer)
        }, interval)
      }
    }
  }
}
