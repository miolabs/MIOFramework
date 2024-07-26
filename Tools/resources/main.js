
// Main entry point
function main(args)
{    
    var app = UIApplication.shared;

    app.delegate = _injectIntoOptional(_create(AppDelegate, "init"));
    app.run();
}