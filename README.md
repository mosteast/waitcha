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
waitcha/0.1.8 darwin-x64 node-v18.13.0
$ waitcha --help [COMMAND]
USAGE
  $ waitcha COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`waitcha cmd COMMAND`](#waitcha-cmd-command)
* [`waitcha help [COMMAND]`](#waitcha-help-command)
* [`waitcha http URL`](#waitcha-http-url)

## `waitcha cmd COMMAND`

wait for a command to fulfill

```
USAGE
  $ waitcha cmd COMMAND

ARGUMENTS
  COMMAND  Command to wait (retry to run)

OPTIONS
  -h, --help                 show CLI help
  -i, --interval=interval    [default: 1000] Retry interval in milliseconds
  -r, --max_retry=max_retry  [default: 12] Max retry limit
  --forever                  Wait forever (without max_retry limit)
  --mute                     Whether to print wait information
  --stdio                    Whether to print std output or accept input
```

_See code: [src/commands/cmd.ts](https://github.com/mosteast/waitcha/blob/v0.1.8/src/commands/cmd.ts)_

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

## `waitcha http URL`

wait for a http request to fulfill

```
USAGE
  $ waitcha http URL

OPTIONS
  -h, --help                           show CLI help
  -i, --interval=interval              [default: 1000] Retry interval in milliseconds
  -m, --method=method                  [default: get] Request method: get|post|option...
  -r, --max_retry=max_retry            [default: 12] Max retry limit

  --debug_text_range=debug_text_range  [default: 0:120] Body text length you want to print whenever retry fails:
                                       --debug_text_range 0:120

  --forever                            Wait forever (without max_retry limit)

  --header_exist=header_exist          Check headers exist: content-type

  --header_is=header_is                Header comparison: content-type:text/html

  --header_match=header_match          Match header field with regular express: "content-length:d+"

  --json_exist=json_exist              Check json fields exist: "a.b.c"|"a[1][2]"

  --json_is=json_is                    Compare json using json path: "a.b.c:1"|"a[1].c:2"

  --json_match=json_match              Match json field value with regular express (this option only applies to string
                                       and number values): "a.b.name:Bob.+"|"a[1].c:d+"

  --mute                               Whether to print wait information

  --text_exist                         Check text body exists

  --text_is=text_is                    Compare body text using `===`: "Hello world!"

  --text_match=text_match              Match body text with regular express: ".+google.+"
```

_See code: [src/commands/http.ts](https://github.com/mosteast/waitcha/blob/v0.1.8/src/commands/http.ts)_
<!-- commandsstop -->
