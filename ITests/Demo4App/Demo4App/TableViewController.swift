//
//  TableViewController.swift
//  Demo4App
//
//  Created by Javier Segura Perez on 29/05/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit
import CoreData

class TableViewController: UITableViewController, NSFetchedResultsControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return fetchedResultsController.sections != nil ? fetchedResultsController.sections!.count : 0
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let sectionInfo = fetchedResultsController.sections?[section]
        return sectionInfo!.numberOfObjects
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)

        // Configure the cell...
        configureCell(cell, at: indexPath)
        return cell
    }
    
    func configureCell(_ cell: UITableViewCell, at indexPath: IndexPath) {
        
        /*get managed object*/
        let movie = fetchedResultsController.object(at: indexPath)
        // Configure Cell
        cell.textLabel?.text = movie.name
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    lazy var fetchedResultsController: NSFetchedResultsController<Movie> = {
        // Initialize Fetch Request
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        
        /*Before you can do anything with Core Data, you need a managed object context. */
        let managedContext = appDelegate.persistentContainer.viewContext
        
        /*As the name suggests, NSFetchRequest is the class responsible for fetching from Core Data.
         
         Initializing a fetch request with init(entityName:), fetches all objects of a particular entity. This is what you do here to fetch all Person entities.
         */
        let fetchRequest = NSFetchRequest<Movie>(entityName: "Movie")
        
        // Add Sort Descriptors
        let sortDescriptor = NSSortDescriptor(key: "name", ascending: false)
        fetchRequest.sortDescriptors = [sortDescriptor]
        
        // Initialize Fetched Results Controller
        let fetchedResultsController = NSFetchedResultsController<Movie>(fetchRequest: fetchRequest, managedObjectContext: managedContext, sectionNameKeyPath: nil, cacheName: nil)
        
        // Configure Fetched Results Controller
        fetchedResultsController.delegate = self
        
        do {
            try fetchedResultsController.performFetch()
        } catch {
            let fetchError = error as NSError
            print("Unable to Perform Fetch Request")
            print("\(fetchError), \(fetchError.localizedDescription)")
        }
        
        return fetchedResultsController
    }()

    
    func controllerWillChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>) {
        /*This delegate method will be called first.As the name of this method "controllerWillChangeContent" suggets write some logic for table view to initiate insert row or delete row or update row process. After beginUpdates method the next call will be for :
         
         - (void)controller:(NSFetchedResultsController *)controller didChangeObject:(id)anObject atIndexPath:(nullable NSIndexPath *)indexPath forChangeType:(NSFetchedResultsChangeType)type newIndexPath:(nullable NSIndexPath *)newIndexPath
         
         */
        tableView.beginUpdates()
    }
    
    /*This delegate method will be called second. This method will give information about what operation exactly started taking place a insert, a update, a delete or a move. The enum NSFetchedResultsChangeType will provide the change types.
     
     
     public enum NSFetchedResultsChangeType : UInt {
     
     case insert
     
     case delete
     
     case move
     
     case update
     }
     
     */
    func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>, didChange anObject: Any, at indexPath: IndexPath?, for type: NSFetchedResultsChangeType, newIndexPath: IndexPath?) {
        switch (type) {
        case .insert:
            if let indexPath = newIndexPath {
                tableView.insertRows(at: [indexPath], with: .fade)
            }
            break;
        case .delete:
            if let indexPath = indexPath {
                tableView.deleteRows(at: [indexPath], with: .fade)
            }
            break;
        case .update:
            if let indexPath = indexPath, let cell = tableView.cellForRow(at: indexPath) {
                configureCell(cell, at: indexPath)
            }
            break;
            
        case .move:
            if let indexPath = indexPath {
                tableView.deleteRows(at: [indexPath], with: .fade)
            }
            
            if let newIndexPath = newIndexPath {
                tableView.insertRows(at: [newIndexPath], with: .fade)
            }
            break;
            
        default:
            NSLog("Unknown")
        }
        
    }
    
    /*The last delegate call*/
    func controllerDidChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>) {
        /*finally balance beginUpdates with endupdates*/
        tableView.endUpdates()
    }
    
    @IBAction func addButtonClicked(sender:UIBarButtonItem){
        let avc = UIAlertController(title: "Alert", message: "Add a new movie", preferredStyle: .alert)
        
        avc.addTextField { (textField:UITextField) in
            textField.placeholder = "Name"
        }
        
        avc.addAction(UIAlertAction.init(title: "OK", style: .default, handler: { (action:UIAlertAction) in
            let ad = UIApplication.shared.delegate as! AppDelegate
            let movie = NSEntityDescription.insertNewObject(forEntityName: "Movie", into: ad.persistentContainer.viewContext) as? Movie
            movie?.name = avc.textFields?[0].text
            ad.saveContext()
        }))

        avc.addAction(UIAlertAction.init(title: "Cancel", style: .cancel, handler: nil))

        present(avc, animated: true, completion: nil)
    }
}
