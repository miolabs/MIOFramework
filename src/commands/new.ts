import chalk from 'chalk';
import * as program from 'commander';
import { ErrorMessage } from '../utils/error';
import { component, View, ViewController, Controller } from './components/component';
export function New(cmd, type, name) {
    switch(type){
        case "v":
        case "view":
          View(cmd, name);
          break;
        case "c":
        case "ctr":
        case "ctrl":
        case "controller":
          Controller(cmd, name)
          break;
        case "vc":
        case "vctr":
        case "vctrl":
        case "viewc":
        case "viewctr":
        case "viewctrl":
        case "viewcontrol":
        case "viewcontroller":
          ViewController(cmd, name);
          break;
        default:
          ErrorMessage(cmd, `Unknown type ${chalk.yellow(type)}.`)
          break;
      }
}