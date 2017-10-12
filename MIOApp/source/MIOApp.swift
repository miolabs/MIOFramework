//
//  MIOApp.swift
//  MIOApp
//
//  Created by GodShadow on 12/10/2017.
//

import MIOFoundation
import MIOUserInterface

protocol MIOAppDelegate {
    
    var window:MUIWindow {get}
    
    func didFinishLaunching()
}

class MIOApp: MIOObject {
    
    static let shared = MIOApp()
    
    var delegate:MIOAppDelegate?
    
    //private var windows = [];
    private var keyWindow:MUIWindow?
    private var mainWindow:MUIWindow?
    private var isMainWindowReady = false;
    
    private override init() {
        super.init()
    }

    func run() {
    
        delegate!.didFinishLaunching();
        
        mainWindow = delegate!.window;
        mainWindow!.makeKeyAndVisible();
        
        mainWindow!.rootViewController!.onLoadView() {
    
            self.mainWindow!.rootViewController!.viewWillAppear(animated: false);
            self.mainWindow!.rootViewController!.viewDidAppear(animated: false);
        
            self.isMainWindowReady = true;
        
//            MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
//            MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
        };
    }
    
}
