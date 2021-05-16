//
//  ViewController.swift
//  ZaraCore
//
//  Created by Javier Segura Perez on 17/06/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class MainViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet var tableView:UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.        
        tableView.reloadData()
    }
    
    // MARK: - Table view data source
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 3
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch section {
        case 0:
            return 1
            
        case 1:
            return 1

        default:
            return staticItems.count
        }
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        if indexPath.section == 0 {
            // Configure the cell...
            let cell = tableView.dequeueReusableCell(withIdentifier: "HeaderCell") as! HeaderCell
            configureHeaderCell(cell)
            return cell
        }
        else if indexPath.section == 1 {
            let cell = tableView.dequeueReusableCell(withIdentifier: "CollectionViewCell") as! CollectionViewCell
            configureScrollCell(cell)
            return cell
        }
        else {
            let cell = tableView.dequeueReusableCell(withIdentifier: "ImageCell") as! ImageCell
            configureImageCell(cell, at: indexPath)
            return cell
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        switch indexPath.section {
        case 0:
            return 135
        default:
            return 610
        }
    }
    
    func configureHeaderCell(_ cell:HeaderCell){
        cell.setItems(headerItems)
    }

    func configureScrollCell(_ cell:CollectionViewCell){
        cell.items = scrollItems
    }

    func configureImageCell(_ cell:ImageCell, at indexPath:IndexPath){
        let item = staticItems[indexPath.row]
        cell.item = item
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
    
    lazy var headerItems: Array<Dictionary<String,String>> = {
        
        var items:[[String:String]] = []
        
        items.append(["Title": "TIMELESS", "ImageName": "Timeless"])
        items.append(["Title": "DRESS TIME", "ImageName": "DressTime"])
        items.append(["Title": "MUM", "ImageName": "Mum"])
//        items.append(["Title": "DRESS TIME", "ImageName": "DressTimeKid"])
//        items.append(["Title": "COLLECTION", "ImageName": "Collection"])
//        items.append(["Title": "DENIM", "ImageName": "Denim"])
//        items.append(["Title": "LIVING ZARA", "ImageName": "Living Zara"])
//        items.append(["Title": "EDITED", "ImageName": "Edited"])
//        items.append(["Title": "BEAUTY", "ImageName": "Beauty"])
//        items.append(["Title": "JOIN LIFE", "ImageName": "JoinLife"])
//        items.append(["Title": "STREET", "ImageName": "Street"])
//        items.append(["Title": "ALL TIME", "ImageName": "AllTime"])
//        items.append(["Title": "ESSENTIALS", "ImageName": "Essentials"])
        
        
        return items
    }()

    lazy var scrollItems: [String] = {
        
        var items:[String] = []
        
        items.append("ScrollItem1")
        items.append("ScrollItem2")
        items.append("ScrollItem3")
        items.append("ScrollItem4")
        items.append("ScrollItem5")
        items.append("ScrollItem6")
        items.append("ScrollItem7")
        items.append("ScrollItem8")
        
        return items
    }()

    lazy var staticItems: [String] = {
        
        var items:[String] = []
        
        items.append("StaticItem1")
        items.append("StaticItem2")
        items.append("StaticItem3")
        items.append("StaticItem4")
        items.append("StaticItem5")
        items.append("StaticItem6")
        items.append("StaticItem7")
        items.append("StaticItem8")
        items.append("StaticItem9")
        
        return items
    }()


}

