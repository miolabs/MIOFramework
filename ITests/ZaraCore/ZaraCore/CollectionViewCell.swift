//
//  HeaderCell.swift
//  ZaraCore
//
//  Created by Javier Segura Perez on 18/06/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import UIKit

class CollectionViewCell: UITableViewCell, UICollectionViewDataSource {

    @IBOutlet var collectionView:UICollectionView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    private var _items:[String] = []
    var items:[String] {
        set {
            stopScrolling()
            _items = newValue
            collectionView.reloadData()
            startScrolling()
        }
        get {
            return _items
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return _items.count;
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ItemCell", for: indexPath)
        
        let item = _items[indexPath.row]
        if let image = UIImage(named: item) {
            let imageView = cell.viewWithTag(1) as! UIImageView
            imageView.image = image
        }
        
        return cell
    }

    var currentIndex = 0
    var timer:Timer?
    func startScrolling(){
        currentIndex = 0
        timer = Timer.scheduledTimer(withTimeInterval: 2, repeats: true) { (timer) in
            self.currentIndex += 1
            if self.currentIndex >= self._items.count { self.currentIndex = 0 }
            let indexPath = IndexPath(row: self.currentIndex, section: 0)
            self.collectionView.scrollToItem(at: indexPath, at: .centeredHorizontally, animated: true)
        }
    }
    
    func stopScrolling(){
        if timer != nil {
            timer!.invalidate()
            timer = nil
        }
    }
    
}
