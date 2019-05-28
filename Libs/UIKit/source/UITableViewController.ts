import { UIViewController } from "./UIViewController";
import { UITableView } from "./UITableView";

export class UITableViewController extends UIViewController
{
    tableView:UITableView = null;

    viewWillAppear(animated?:boolean){
      super.viewWillAppear(animated);
    }
}