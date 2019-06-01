//
//  ViewController.swift
//  Demo5
//
//  Created by Bubulkowa norka on 30/05/2019.
//  Copyright © 2019 Flambe Agency. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
  }

  @IBAction func showAlert(sender:UIButton){
    let avc = UIAlertController(title: "Alert", message: "Add a new movie", preferredStyle: .alert)
    
    avc.addTextField { (textField:UITextField) in
      textField.placeholder = "Name"
    }
    
    avc.addAction(UIAlertAction.init(title: "OK", style: .default, handler: { (action:UIAlertAction) in
      NSLog("OK")
    }))
    
    avc.addAction(UIAlertAction.init(title: "Cancel", style: .cancel, handler: nil))
    
    present(avc, animated: true, completion: nil)
  }

}

