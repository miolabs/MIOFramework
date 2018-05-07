import * as program from 'commander';
import chalk from 'chalk';

export function ErrorMessage(command, message) {
    command.outputHelp()
    console.log(`  ${chalk.red(message)}`)
    console.log()
    process.exit(1)
}

// These enchancements will only run once, due to caching in imports.
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`mio <command> --help`)} for detailed usage of given command.`)
    console.log()
})

const decorateErrorMessages = (methodName, log) => {
    program.Command.prototype[methodName] = function (...args) {
        if (methodName === 'unknownOption' && this._allowUnknownOption) {
            return
        }
        ErrorMessage(this, log(...args))
    }
}
decorateErrorMessages('unknownOption', optionName => {
    return `Unknown option ${chalk.yellow(optionName)}.`
})
decorateErrorMessages('missingArgument', argName => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})
decorateErrorMessages('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
        flag ? `, got ${chalk.yellow(flag)}` : ``
    )
})