//
//  ImageCell.swift
//  ZaraCore
//
//  Created by Javier Segura Perez on 18/06/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class ImageCell: UITableViewCell {

    @IBOutlet var photoImageView:UIImageView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    private var _item:String!
    
    var item:String {
        set {
            _item = newValue
            photoImageView.image = UIImage(named: _item)
        }
        get {
            return _item
        }
    }

}
