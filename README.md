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
waitcha/0.0.0 darwin-x64 node-v12.14.0
$ waitcha --help [COMMAND]
USAGE
  $ waitcha COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`waitcha hello [FILE]`](#waitcha-hello-file)
* [`waitcha help [COMMAND]`](#waitcha-help-command)

## `waitcha hello [FILE]`

describe the command here

```
USAGE
  $ waitcha hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ waitcha hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/mosteast/waitcha/blob/v0.0.0/src/commands/hello.ts)_

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
