import { Command } from '@oclif/command'
import { T_waiter_state } from '../util/wait'
import { T_command_opt } from '@mosteast/command/src/command'
import { SpawnOptions } from 'child_process'

export abstract class Base extends Command {
  state_waiter!: T_waiter_state

  opt_command!: T_command_opt
  opt_spawn!: SpawnOptions

  parsed?: any

  prepare_opts() {
    const { flags } = this.parsed

    this.state_waiter = {
      interval: flags.interval,
      max_retry: flags.max_retry,
      mute: flags.mute,
      forever: flags.forever,
      count: 0,
    }

    this.opt_command = {
      mute: flags.mute,
    }

    this.opt_spawn = {}

    if (!flags.stdio) {
      this.opt_spawn.stdio = [ 'inherit', 'ignore', 'ignore' ]
    }
  }
}
