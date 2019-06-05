//
//  ViewController.swift
//  PlaygroundTest
//
//  Created by Bubulkowa norka on 04/06/2019.
//  Copyright © 2019 Flambe Agency. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

  var view1:UIView!
  
  override func viewDidLoad(){
    super.viewDidLoad()
    
    view1 = UIView(frame: CGRect(x: 0, y: 300, width: 200, height: 50))
    view1.backgroundColor = UIColor(displayP3Red: 255, green: 0, blue: 0, alpha: 1)
    view.addSubview(view1)
    
    let button = UIButton(frame: CGRect(x: 0, y: 60, width: 200, height: 50))
    button.setTitle("Animate!", for: .normal)
    button.setTitleColor(UIColor(displayP3Red: 0, green: 0, blue: 255, alpha: 1), for: .normal)
    view.addSubview(button)
    button.addTarget(self, action: #selector(buttonAction(sender:)), for: .touchUpInside)
    
    let button2 = UIButton(frame: CGRect(x: 150, y: 60, width: 200, height: 50))
    button2.setTitle("ShowAlert", for: .normal)
    button2.setTitleColor(UIColor(displayP3Red: 0, green: 0, blue: 255, alpha: 1), for: .normal)
    view.addSubview(button2)
    button2.addTarget(self, action: #selector(alertButtonAction(sender:)), for: .touchUpInside)
    
    
  }
  
  @objc func buttonAction(sender: UIButton) {
    UIView.animate(withDuration: 5) {
      self.view1.frame = CGRect(x: 100, y: 100, width: 200, height: 50)
    }
  }
  
  @objc func alertButtonAction(sender: UIButton){
    let avc = UIAlertController(title: "Alert", message: "Add a new movie", preferredStyle: .alert)
    
    avc.addTextField { (textField:UITextField) in
      textField.placeholder = "Name"
    }
    
    avc.addAction(UIAlertAction.init(title: "OK", style: .default, handler: { (action:UIAlertAction) in
      guard let title = avc.textFields?[0].text else {
        return
      }
      print("You press OK with text: " + title)
    }))
    
    avc.addAction(UIAlertAction.init(title: "Cancel", style: .cancel, handler: { (action:UIAlertAction) in
      print("You press CANCEL")
    }))
    
    present(avc, animated: true, completion: nil)
  }

}

