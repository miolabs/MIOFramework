export class CGPoint
{
    x = 0;
    y = 0;

    public static Zero()
    {
        var p = new CGPoint(0, 0);
        return p;
    }

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }
}