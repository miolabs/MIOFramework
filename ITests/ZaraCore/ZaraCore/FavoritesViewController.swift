//
//  FavoritesViewController.swift
//  ZaraCore
//
//  Created by Javier Segura Perez on 18/06/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class FavoritesViewController: UIViewController {

    @IBOutlet var closeView:UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        let tapGesture = UITapGestureRecognizer(target:self, action:#selector(self.closeAction(sender:)))
        closeView.addGestureRecognizer(tapGesture)
        closeView.isUserInteractionEnabled = true
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    @IBAction func closeAction(sender:UITapGestureRecognizer){
        dismiss(animated: true, completion: nil)
    }


}
