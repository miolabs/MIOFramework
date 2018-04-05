import chalk from 'chalk';
import minimist from 'minimist';
import * as program from 'commander';

import { Init } from './commands/init';
import { New } from './commands/new';
import { ErrorMessage } from './utils/error';
import { cleanArgs } from './utils/arguments';

program
  .usage('<command> [options]')

program
  .command('init <app-name>')
  .description('create a new project')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((name, cmd) => { Init(name, cleanArgs(cmd))})

program
  .command('new <type> <name>')
  .description('create a new component\n\n  type: (view | ctr)\n  name: string')
  .action((type, name, cmd) => { New(cmd, type, name)})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

