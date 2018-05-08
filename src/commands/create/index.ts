/**
 * This command is responsible for creating new components from templated blueprints.
 */

import chalk from "chalk";
import { ErrorMessage } from "../../utils/error";
import { Controller, View, ViewController } from "./component";
import { cleanArgs } from "../../utils/arguments";

export function New(cmd, type, name) {
    const params = cleanArgs(cmd);
    switch (type) {
        case "view":
          View(params, name);
          break;
        case "controller":
          Controller(params, name);
          break;
        case "viewcontroller":
          ViewController(params, name);
          break;
        default:
          ErrorMessage(params, `Unknown type ${chalk.yellow(type)}.`);
          break;
      }
}
