import { UITableView, UITableViewDatasource, UITableViewDelegate } from "./UITableView";
import { UIViewController } from "./UIViewController";


export class UITableViewController extends UIViewController implements UITableViewDatasource, UITableViewDelegate
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

    // UITableViewDataSource required methods
    numberOfSections(tableView: UITableView): number {
      return 1;
    }

    numberOfRowsInSection(tableView: UITableView, section: number): number {
      return 0;
    }

    cellForRowAt(tableView: UITableView, indexPath: { section: number, row: number }): any {
      // Replace 'any' with your cell type
      return null;
    }

    // Implement required UITableViewDelegate methods
    didSelectCellAtIndexPath(tableView: UITableView, indexPath: { section: number, row: number }): void {
      // Optional: override in subclass
    }

}