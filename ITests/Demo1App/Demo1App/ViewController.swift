//
//  ViewController.swift
//  Demo1App
//
//  Created by Javier Segura Perez on 26/03/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var textLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func buttonClicked(sender: UIButton){
        NSLog("Button clicked!!")
        //textLabel.text = "Bye"
    }
}



