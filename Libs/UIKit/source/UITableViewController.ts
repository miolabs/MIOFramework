import { UIViewController } from "./UIViewController";
import { UITableView } from "./UITableView";

export class UITableViewController extends UIViewController
{
    tableView:UITableView = null;

    viewDidLoad(){
      super.viewDidLoad();

      let temp = this.view.subviews[0] as UITableView;
      this.tableView = temp
      this.tableView.dataSource = this;
      this.tableView.delegate = this;
    }

    viewWillAppear(animated?:boolean){
      super.viewWillAppear(animated);

      this.tableView.reloadData();
    }
}