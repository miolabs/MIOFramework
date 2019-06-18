import { UIViewController } from "./UIViewController";
import { UITableView } from "./UITableView";

export class UITableViewController extends UIViewController
{
    tableView:UITableView = null;

    viewDidLoad(){
      super.viewDidLoad();

      this.tableView = this.view as UITableView;      
      this.tableView.dataSource = this;
      this.tableView.delegate = this;
    }

    viewWillAppear(animated?:boolean){
      super.viewWillAppear(animated);

      this.tableView.reloadData();
    }
}