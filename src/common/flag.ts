import { flags } from '@oclif/command'

export const common_flag: flags.Input<any> = {
  help: flags.help({ char: 'h' }),

  mute: flags.boolean({
    default: false,
    description: 'Whether to print wait information',
  }),

  forever: flags.boolean({
    default: false,
    description: 'Wait forever (without max_retry limit)',
  }),

  interval: flags.integer({
    char: 'i',
    default: 1000,
    description: 'Retry interval in milliseconds',
  }),

  max_retry: flags.integer({
    char: 'r',
    default: 12,
    description: 'Max retry limit',
  }),
}
