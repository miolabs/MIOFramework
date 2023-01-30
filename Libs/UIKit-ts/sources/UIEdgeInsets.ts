
function MIOEdgeInsetsMake(top, left, bottom, rigth){

    let ei = new UIEdgeInsets();
    ei.initWithValues(top, left, bottom, rigth);

    return ei;
}

class UIEdgeInsets extends NSObject
{
    top = 0;
    left = 0;
    bottom = 0;
    right = 0;
    
    static Zero():UIEdgeInsets {
        let ei = new UIEdgeInsets();
        ei.init();

        return ei;
    }    

    initWithValues(top, left, bottom, right){
        
        super.init();

        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    }
}