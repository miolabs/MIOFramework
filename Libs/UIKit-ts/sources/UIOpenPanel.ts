/// <reference path="UIWindow.ts" />


enum MIOFileHandlingPanel
{
    OKButton
}

class UIOpenPanel extends UIWindow
{
    files = [];

    static openPanel():UIOpenPanel {
        let op = new UIOpenPanel();
        op.init();

        return op;
    }

    private panelTarget = null;
    private panelCompletion = null;
    private _inputLayer = null;
    beginSheetModalForWindow(window:UIWindow, target, completion){
        this.panelTarget = target;
        this.panelCompletion = completion;

        //Web hack to open dialog
        let instance = this;

        this._inputLayer = document.createElement("INPUT");
        this._inputLayer.setAttribute("type", "file");
        this._inputLayer.style.display = "none";        
        this._inputLayer.addEventListener('change', function(ev){
            let files = ev.target.files; // FileList object
            instance.filesDidSelect(files);
        }, false);
        
        UICoreLayerAddSublayer(window.layer, this._inputLayer);

        this._inputLayer.click();
    }
    
    private filesDidSelect(files){
        this.files = files;

        if (this.panelTarget != null && this.panelCompletion != null) {
            this.panelCompletion.call(this.panelTarget, MIOFileHandlingPanel.OKButton);
        }
    }

}