/**
 * This command is responsible for creating new components from templated blueprints.
 */

import chalk from "chalk";
import { ErrorMessage } from "../../utils/error";
import { Controller, View, ViewController } from "./component";

export function New(cmd, type, name) {
    switch (type) {
        case "view":
          View(cmd, name);
          break;
        case "controller":
          Controller(cmd, name);
          break;
        case "viewcontroller":
          ViewController(cmd, name);
          break;
        default:
          ErrorMessage(cmd, `Unknown type ${chalk.yellow(type)}.`);
          break;
      }
}
