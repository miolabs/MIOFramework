//
//  HeaderCell.swift
//  ZaraCore
//
//  Created by Javier Segura Perez on 18/06/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class HeaderCell: UITableViewCell, UICollectionViewDataSource {
    
    @IBOutlet var collectionView:UICollectionView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    private var _items:[[String:String]]!
    func setItems(_ items:[[String:String]]) {
        _items = items
        collectionView.reloadData()
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return _items.count;
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ItemCell", for: indexPath)
        let item = _items[indexPath.row] as Dictionary<String,String>
        
        let image = UIImage(named: item["ImageName"]!)
        
        if image != nil {
            let imageView = cell.viewWithTag(1) as! UIImageView
            imageView.image = image
        }
        
        let label = cell.viewWithTag(2) as! UILabel
        label.text = item["Title"]
        
        return cell
    }


}
