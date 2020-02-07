waitcha
=======

Just want to wait everything in every way

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/waitcha.svg)](https://npmjs.org/package/waitcha)
[![Downloads/week](https://img.shields.io/npm/dw/waitcha.svg)](https://npmjs.org/package/waitcha)
[![License](https://img.shields.io/npm/l/waitcha.svg)](https://github.com/mosteast/waitcha/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g waitcha
$ waitcha COMMAND
running command...
$ waitcha (-v|--version|version)
waitcha/0.1.0 darwin-x64 node-v12.14.0
$ waitcha --help [COMMAND]
USAGE
  $ waitcha COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`waitcha cmd <COMMAND>`](#waitcha-cmd-command)
* [`waitcha help [COMMAND]`](#waitcha-help-command)

## `waitcha cmd <COMMAND>`

wait for a command to fulfill

```
USAGE
  $ waitcha cmd <COMMAND>
  $ waitcha cmd <COMMAND> [OPTIONS]

OPTIONS
  -h, --help                 show CLI help
  -i, --interval=interval    [default: 1000] Retry interval in milliseconds
  -m, --max_retry=max_retry  [default: 12] Max retry limit.
  -n, --name=name            name to print
```

_See code: [src/commands/cmd.ts](https://github.com/mosteast/waitcha/blob/v0.1.0/src/commands/cmd.ts)_

## `waitcha help [COMMAND]`

display help for waitcha

```
USAGE
  $ waitcha help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
