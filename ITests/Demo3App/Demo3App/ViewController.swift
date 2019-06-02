//
//  ViewController.swift
//  Demo3App
//
//  Created by Javier Segura Perez on 28/04/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var textLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        textLabel.text = rowTitle
    }
    
    var rowTitle:String!
    
    func setTitle(title:String){
        rowTitle = title
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
