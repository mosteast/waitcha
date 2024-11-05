import { blueBright, gray, green, red, yellowBright } from "colorette";

const printer = {
  verbose(a, ...args) {
    if (typeof a === "object") {
      console.info(a, ...args);
    } else {
      console.log(gray(a), ...args);
    }
  },
  success(a, ...args) {
    if (typeof a === "object") {
      console.info(a, ...args);
    } else {
      console.info(green(a), ...args);
    }
  },
  info(a, ...args) {
    if (typeof a === "object") {
      console.info(a, ...args);
    } else {
      console.info(blueBright(a), ...args);
    }
  },
  warn(a, ...args) {
    if (typeof a === "object") {
      console.warn(a, ...args);
    } else {
      console.info(yellowBright(a), ...args);
    }
  },
  error(a, ...args) {
    if (typeof a === "object") {
      console.error(a, ...args);
    } else {
      console.info(red(a), ...args);
    }
  },
};

export const print_verbose = printer.verbose;
export const print_success = printer.success;
export const print_info = printer.info;
export const print_warn = printer.warn;
export const print_error = printer.error;
