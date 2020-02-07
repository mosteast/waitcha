import { flags } from '@oclif/command'
import { waiter } from '../util/waiter'
import { common_flag } from '../common/flag'
import * as Parser from '@oclif/parser'
import { Base } from '../common/base'
import fetch from 'node-fetch'
import { print_verbose } from '../util/printer'
import { get } from 'lodash'

export default class Http extends Base {
  static description = 'wait for a http request to fulfill'

  // static usage = [
  //   'http google.com',
  //   'http http://google.com',
  //   'http https://google.com',
  //   'http https://google.com:80',
  //   'http google.com --interval 2000 --max_retry 10',
  //   'http google.com -i 2000 -m 10',
  //   'http google.com -i 2000',
  // ]

  static flags: flags.Input<any> = {
    method: flags.string({
      char: 'm',
      default: 'get',
      description: 'Request method: get|post|option...',
    }),

    header_is: flags.string({
      description: 'Header comparison: content-type:text/html',
      multiple: true,
    }),

    header_exist: flags.string({
      description: 'Check headers exist: content-type',
      multiple: true,
    }),

    header_match: flags.string({
      description: 'Match header field with regular express: "content-length:\d+"',
      multiple: true,
    }),

    text_exist: flags.boolean({
      description: 'Check text body exists',
      default: false,
    }),

    text_match: flags.string({
      description: 'Match body text with regular express: ".+google.+"',
      multiple: true,
    }),

    text_is: flags.string({
      description: 'Compare body text using `===`: "Hello world!"',
      multiple: true,
    }),

    json_exist: flags.string({
      description: 'Check json fields exist: "a.b.c"|"a[1][2]"',
      multiple: true,
    }),

    json_is: flags.string({
      description: 'Compare json using json path: "a.b.c:1"|"a[1].c:2"',
      multiple: true,
    }),

    json_match: flags.string({
      description: 'Match json field value with regular express (this option only applies to string and number values): "a.b.name:Bob.+"|"a[1].c:\d+"',
      multiple: true,
    }),

    debug_text_range: flags.string({
      description: 'Body text length you want to print whenever retry fails: --debug_text_range 0:120',
      default: '0:120',
    }),

    ...common_flag,
  }

  static args: Parser.args.IArg[] = [
    {
      name: 'url',
      required: true,
    },
  ]

  async run() {
    const { args, flags } = this.parsed = this.parse(Http)
    const url = args.url
    this.prepare_opts()

    waiter(async () => {
      return new Promise<void>(async (resolve, reject) => {
        let res, ok = true
        res = await fetch(url).catch(e => {
          ok = false
        })

        if (ok) {
          ok = res.ok
          const text = await res.text()
          const range = flags.debug_text_range?.split(':').map(it => parseInt(it))
          const headers = res.headers
          let json
          try {json = JSON.parse(text)} catch (e) {}

          if (ok && flags.text_exist) {
            only_false(!!text.length)
            if (!flags.mute && !ok) {
              print_verbose(`text body not exists`)
            }
          }

          if (ok && flags.text_match) {
            for (let it of flags.text_match) {
              const reg = new RegExp(it)
              only_false(reg.test(text))
              if (!flags.mute && !ok) {
                print_verbose(`text not matches, text:\n${ text.substring(range[0], range[1]) }...`)
              }
            }
          }

          if (ok && flags.text_is) {
            for (let it of flags.text_is) {
              only_false(text === it)
              if (!flags.mute && !ok) {
                print_verbose(`text comparison failed, text:\n${ text.substring(range[0], range[1]) }...`)
              }
            }
          }

          if (ok && flags.header_exist) {
            for (let it of flags.header_exist) {
              only_false(headers.has(it))
              if (!flags.mute && !ok) {
                print_verbose(`headers not exist, header:`)
                print_verbose(it)
              }
            }
          }

          if (ok && flags.header_is) {
            for (let it of flags.header_is) {
              const { key, value } = parse_colon_pair(it)
              const actual_value = '' + headers.get(key)
              only_false(actual_value === value)
              if (!flags.mute && !ok) {
                print_verbose(`header comparison failed, header field:`)
                print_verbose(`${ key }: ${ actual_value } (Input: "${ value }")`)
              }
            }
          }

          if (ok && flags.header_match) {
            for (let it of flags.header_match) {
              const { key, value } = parse_colon_pair(it)
              const actual_value = '' + headers.get(key)
              const regex = new RegExp(value)
              only_false(regex.test(actual_value))
              if (!flags.mute && !ok) {
                print_verbose(`header matching failed, header field:`)
                print_verbose(`${ key }: ${ actual_value } (RegExp: "${ value }")`)
              }
            }
          }

          if (ok && (flags.json_is || flags.json_exist)) {
            if (!json) {
              print_verbose('Response body is not JSON format.')
              return
            }

            const list = flags.json_is || flags.json_exist

            for (let it of list) {
              const pair = parse_colon_pair(it)
              const path = pair.key
              const value = pair.value

              const actual_raw = get(json, path)

              if (flags.json_exist) {
                only_false(actual_raw !== undefined)
                if (!flags.mute && !ok) {
                  print_verbose(`json field not exists, json field:`)
                  print_verbose(`${ path }:${ actual_raw }`)
                }
              } else if (flags.json_is) {
                const actual_str = '' + actual_raw
                only_false(value === actual_str)
                if (!flags.mute && !ok) {
                  print_verbose(`JSON field comparison failed, JSON field:`)
                  print_verbose(`${ path }:${ actual_str } (Input: "${ value }")`)
                }
              }
            }
          }

          if (ok && flags.json_match) {

            if (!json) {
              print_verbose('Response body is not JSON format.')
              return
            }

            for (let it of flags.json_match) {
              const pair = parse_colon_pair(it)
              const path = pair.key
              const reg_str = pair.value

              const regex = new RegExp(reg_str)
              const actual = '' + get(json, path)
              only_false(regex.test(get(json, path)))
              if (!flags.mute && !ok) {
                print_verbose(`json matching failed, json field:`)
                print_verbose(`${ path }:${ actual } (RegExp: "${ reg_str }")`)
              }
            }
          }

          ok ? resolve() : reject()

          /**
           * Only set false to ok
           */
          function only_false(bool: boolean) {
            if (bool) {return bool}

            ok = false
          }
        } else {
          reject()
        }
      })

    }, this.state_waiter)
      .catch(e => process.exit(1))
  }
}

export function parse_colon_pair(kv: string): { key: string, value: string } {
  const arr = kv.split(':').map(it => it.trim())
  return {
    key: arr[0],
    value: arr[1],
  }
}
