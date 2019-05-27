
// Main entry point
function main(args)
{    
    var app = UIApplication.sharedInstance();

    app.delegate = _create(AppDelegate, "init");
    app.run();
}