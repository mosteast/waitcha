import { flags } from '@oclif/command'
import * as Parser from '@oclif/parser'
import { wait } from '../util/wait'
import { command } from '@mosteast/command'
import { common_flag } from '../common/flag'
import { Base } from '../common/base'

export default class Cmd extends Base {
  static description = 'wait for a command to fulfill'

  // static usage = [
  //   'cmd "ls test.log"',
  //   'cmd "ls test.log" --interval 2000 --max_retry 10',
  //   'cmd "ls test.log"  --interval 2000 2000',
  //   'cmd "ls test.log" -i 2000 [&& ANOTHER_WAITCHA && ...]',
  // ]

  static flags: flags.Input<any> = {
    stdio: flags.boolean({
      default: false,
      description: 'Whether to print std output or accept input',
    }),

    ...common_flag,
  }

  static args: Parser.args.IArg[] = [
    {
      name: 'command',
      required: true,
      description: 'Command to wait (retry to run)',
    },
  ]

  async run() {
    const { args } = this.parsed = this.parse(Cmd)
    const cmd = args.command
    this.prepare_opts()

    await wait(async () => {
      const r2 = await command(cmd, this.opt_command, this.opt_spawn)
      if (r2.code) {
        throw new Error()
      } else {
        return true
      }
    }, this.state_waiter)
      .catch(e => process.exit(1))
  }
}
