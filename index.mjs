import child_process from 'child_process'
import { readdir } from 'fs/promises'
import { promisify } from 'util'

const exec = promisify(child_process.exec)

async function main() {
  const folder = './pages/api'
  const files = await readdir(folder)

  for (const file of files) {
    if (file.includes('.js')) {
      await exec(
        `git mv ${folder}/${file} ${folder}/${file.replace('.js', '.ts')}`
      )
    }
  }
}
main()
