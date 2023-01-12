import * as chalk from 'chalk';

const printer = {
  verbose(a, ...args) {
    if (typeof a === 'object') {
      console.info(a, ...args);
    } else {
      console.log(chalk.gray(a, ...args));
    }
  },
  success(a, ...args) {
    if (typeof a === 'object') {
      console.info(a, ...args);
    } else {
      console.info(chalk.green(a, ...args));
    }
  },
  info(a, ...args) {
    if (typeof a === 'object') {
      console.info(a, ...args);
    } else {
      console.info(chalk.blueBright(a, ...args));
    }
  },
  warn(a, ...args) {
    if (typeof a === 'object') {
      console.warn(a, ...args);
    } else {
      console.info(chalk.yellowBright(a, ...args));
    }
  },
  error(a, ...args) {
    if (typeof a === 'object') {
      console.error(a, ...args);
    } else {
      console.info(chalk.red(a, ...args));
    }
  },
};

export const print_verbose = printer.verbose;
export const print_success = printer.success;
export const print_info = printer.info;
export const print_warn = printer.warn;
export const print_error = printer.error;
