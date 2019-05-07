
// Main entry point
function main(args)
{    
    var app = UIApplication.sharedInstance();

    app.delegate = new AppDelegate();
    app.run();
}