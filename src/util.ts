import { spawn } from 'child_process'

export function command(cmd: string, ...args: string[]) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      shell: true,
      stdio: 'inherit',
    })

    const result: { message?: string, code?: number } = {}

    child.on('message', r => {
      result.message = r
    })

    child.on('error', e => {
      reject(e)
    })

    child.on('exit', (r) => {
      result.code = r
      resolve(result)
    })
  })
}
