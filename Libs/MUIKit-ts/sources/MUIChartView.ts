import { Chart } from 'chart.js'
import { UIView } from "./UIView";

export enum UIChartViewType {
    Bar,
    HorizontalBar,
    Line,
    Pie
}

export class UIChartView extends UIView {

    title = "";
    backgroundChartColors = [
        'rgba(0, 191, 191, 0.6)',
        'rgba(255, 211, 88, 0.6)',
        'rgba(75, 204, 255, 0.6)',
        'rgba(255, 86, 113, 0.6)',
    ];

    borderChartColors = [
        'rgba(0, 191, 191, 0.6)',
        'rgba(255, 211, 88, 0.6)',
        'rgba(75, 204, 255, 0.6)',
        'rgba(255, 86, 113, 0.6)',
    ];

    labels = null;
    values = null;

    private canvas = null;
    private chartLayer = null;


    initWithLayer(layer, owner, options?) {
        super.initWithLayer(layer, owner, options);

        // this.canvas = UILayerGetFirstElementWithTag(this.layer, "CANVAS");
        // if (this.canvas == null) {
        //     this.canvas = document.createElement("canvas");
        //     this.canvas.style.width = "100%";
        //     this.canvas.style.height = "100%";
        //     this.layer.appendChild(this.canvas);
        // }
    }

    private createCanvas(){
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.layer.appendChild(this.canvas);
    }

    private destroyCanvas() {
        this.layer.removeChild(this.canvas);
        this.canvas = null;
    }

    renderWithType(type:UIChartViewType) {

        let typeName = this.nameFromChartType(type);
        let bgColors = this.backgroundChartColors;
        let fgColors = this.borderChartColors;        
        let values = this.values;
        let labels = this.labels;
        let opts = this.optionsForChartType(type, this.title);
        let data = {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: bgColors,
                borderColor: fgColors,
                borderWidth: 1
                }]
            }    

        this.clear();

        this.createCanvas();
        this.chartLayer = new Chart(this.canvas, {
            type: typeName,
            data: data,
            options: opts
        });
    }

    clear(){

        if (this.chartLayer != null) {
            this.chartLayer.destroy();
            this.destroyCanvas();
        }        
    }    

    private nameFromChartType(type:UIChartViewType) {

        var name = null;

        switch (type) {

            case UIChartViewType.Bar:
                name = "bar";
                break;

            case UIChartViewType.HorizontalBar:
                name = "horizontalBar";
                break;

            case UIChartViewType.Line:
                name = "line";
                break;

            case UIChartViewType.Pie:
                name = "pie";
                break;                
        }

        return name;
    }

    private optionsForChartType(type:UIChartViewType, title:string) {

        var op = {};

        if (title != null){
            op["title"] = {"display": true, "text":title};
        }

        switch (type) {

            case UIChartViewType.Pie:
                op["legend"] = {"display": true, "position": "right"};       
                break;

            default:
                op["legend"] = {"display": false};
                break;
        }

        return op;
    }

}