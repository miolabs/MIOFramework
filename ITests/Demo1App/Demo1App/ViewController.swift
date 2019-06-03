//
//  ViewController.swift
//  Demo1App
//
//  Created by Javier Segura Perez on 26/03/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var textField: UITextField!
  @IBOutlet weak var switchButton: UISwitch!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let view = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 50))
        view.backgroundColor = UIColor(displayP3Red: 255, green: 0, blue: 0, alpha: 1)                
        
        UIView.animate(withDuration: 5) {
            view.frame = CGRect(x: 100, y: 100, width: 200, height: 50)
        }
    }
    
    @IBAction func buttonClicked(sender: UIButton){
        NSLog("Button clicked!!")
        label.text = "Button clicked!"
    }
  
    @IBAction func switchClicked(sender: UISwitch){
        label.text = "Hello from switch button " + (sender.isOn ? "on" : "not on");
    }
    
    @IBAction func segmentedClicked(sender: UISegmentedControl){
        label.text = "Hello from segment " + String(sender.selectedSegmentIndex);
    }


    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let txt = NSString(string: textField.text!)
        label.text = txt.replacingCharacters(in: range, with: string)
        return true
    }
    
}



