//
//  ViewController.swift
//  Demo1App
//
//  Created by Javier Segura Perez on 26/03/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var textField: UITextField!
  @IBOutlet weak var switchButton: UISwitch!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func buttonClicked(sender: UIButton){
        NSLog("Button clicked!!")
        label.text = textField.text
        switchButton.isOn = !switchButton.isOn
      
    }
  
    @IBAction func switchClicked(sender: UISwitch){
        label.text = "Hello from switch button " + (sender.isOn ? "on" : "not on");
    }
    
    @IBAction func segmentedClicked(sender: UISegmentedControl){
        label.text = "Hello from switch button " + String(sender.selectedSegmentIndex);
    }


}



