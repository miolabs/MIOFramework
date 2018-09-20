/**
 * Created by godshadow on 20/5/16.
 */

var NSLibIsLoaded = false;

var _NSLibLoadedTarget = null;
var _NSLibLoadedCompletion = null;

var _NSLibFileIndex = 0;
var _NSLibFiles = [];

var _mc_force_mobile = false;

export enum NSLibInitType
{
    Release,
    Debug
}

var _NSLibMainFn = null;

export function NSLibInit(mainFn, type?:NSLibInitType) {

    _NSLibMainFn = mainFn;

    NSLibDecodeParams(window.location.search, this, function (param, value) {

        // Only for test
        if (param == "forceMobile")
            _mc_force_mobile = value == "true" ? true : false;
    });

    // If debug load NSJS Libs
    if (type == NSLibInitType.Debug)
    {
        _NSLibDownloadLibFiles();
    }
}

export function NSLibDownloadScript(url, target, completion)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){

        if(xhr.status == 200 && xhr.responseText != null)
        {
            // success!
            completion.call(target, xhr.responseText);
        }
        else {
            throw new Error("We couldn't download the NS libs");
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

export function NSLibLoadStyle(url)
{
    var ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = url;
    document.getElementsByTagName("head")[0].appendChild(ss);
}

export function NSLibLoadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    //script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

export function NSLibLoadScriptCallback()
{
    console.log("Download completed " + _NSLibFileIndex);
    _NSLibFileIndex++;

    if (_NSLibFileIndex < _NSLibFiles.length)
        NSLibDownloadNextFile();
    else
    {
        NSLibIsLoaded = true;
        if (_NSLibLoadedCompletion != null && _NSLibLoadedTarget != null)
            _NSLibLoadedCompletion.call(_NSLibLoadedTarget);

        _NSLibLoadedTarget = null;
        _NSLibLoadedCompletion = null;
    }
}

export function NSLibDownloadNextFile()
{
    var file = _NSLibFiles[_NSLibFileIndex];
    var url = "src/NSlib/" + file + ".js";

    console.log("Downloading " + url + " (" + _NSLibFileIndex + ")");
    NSLibLoadScript(url, NSLibLoadScriptCallback);
}

export function NSLibOnLoaded(target, completion)
{
    if (NSLibIsLoaded == true)
    {
        completion.call(target);
    }
    else
    {
        NSLibLoadStyle("src/NSlib/extras/animate.min.css");
        if (_NSLibFiles.length == 0)
        {
            NSLibIsLoaded = true;
            completion.call(target);
        }
        else {

            _NSLibLoadedTarget = target;
            _NSLibLoadedCompletion = completion;

            NSLibDownloadNextFile();
        }
    }
}

export function NSLibDownloadLibFile(file)
{
    _NSLibFiles.push(file);
    console.log("Added file to download: " + file);
}

export function NSLibDownloadFile(file)
{
    _NSLibFiles.push("../" + file);
    console.log("Added file to download: " + file);
}

export function NSLibIsRetina ()
{
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1)
        return true;

    if (window.matchMedia && window.matchMedia(mediaQuery).matches)
        return true;

    return false;
}

export function NSLibDecodeParams(string, target?, completion?)
{
    var param = "";
    var value = "";
    var isParam = false;

    for (var index = 0; index < string.length; index++)
    {
        var ch = string.charAt(index);

        if (ch == "?")
        {
            isParam = true;
        }
        else if (ch == "&")
        {
            // new param
            NSLibEvaluateParam(param, value, target, completion);
            isParam = true;
            param = "";
            value = "";
        }
        else if (ch == "=")
        {
            isParam = false;
        }
        else
        {
            if (isParam == true)
                param += ch;
            else
                value += ch;
        }
    }

    NSLibEvaluateParam(param, value, target, completion);
}

export function NSLibEvaluateParam(param, value, target, completion)
{
    if (target != null && completion != null)
        completion.call(target, param, value);
}

// Download files individually in debug mode
export function _NSLibDownloadLibFiles()
{
    // NSLib files
    NSLibDownloadLibFile("NSCore");
    NSLibDownloadLibFile("NSCoreTypes");
    NSLibDownloadLibFile("NSObject");
    NSLibDownloadLibFile("NSUserDefaults");
    NSLibDownloadLibFile("NSString");
    NSLibDownloadLibFile("NSDate");
    NSLibDownloadLibFile("Date_NS");
    NSLibDownloadLibFile("NSUUID");
    NSLibDownloadLibFile("NSNotificationCenter");
    NSLibDownloadLibFile("NSWebApplication");
    NSLibDownloadLibFile("NSURLConnection");
    NSLibDownloadLibFile("NSBundle");
    NSLibDownloadLibFile("NSPredicate");
    NSLibDownloadLibFile("NSSortDescriptor");
    NSLibDownloadLibFile("NSManagedObjectContext");
    NSLibDownloadLibFile("NSFetchedResultsController");
    NSLibDownloadLibFile("NSView");
    NSLibDownloadLibFile("NSScrollView");
    NSLibDownloadLibFile("NSWindow");
    NSLibDownloadLibFile("MUILabel");
    NSLibDownloadLibFile("NSTableView");
    NSLibDownloadLibFile("NSCollectionView");
    NSLibDownloadLibFile("NSCalendarView");
    NSLibDownloadLibFile("NSImageView");
    NSLibDownloadLibFile("NSMenu");
    NSLibDownloadLibFile("NSActivityIndicator");
    NSLibDownloadLibFile("NSWebView");
    NSLibDownloadLibFile("NSControl");
    NSLibDownloadLibFile("MUIButton");
    NSLibDownloadLibFile("NSComboBox");
    NSLibDownloadLibFile("NSPopUpButton");
    NSLibDownloadLibFile("NSCheckButton");
    NSLibDownloadLibFile("NSSegmentedControl");
    NSLibDownloadLibFile("MUITextField");
    NSLibDownloadLibFile("NSTextArea");
    NSLibDownloadLibFile("NSTabBar");
    NSLibDownloadLibFile("NSPageControl");
    NSLibDownloadLibFile("NSViewController");
    NSLibDownloadLibFile("NSViewController_Animation");
    NSLibDownloadLibFile("NSViewController_PresentationController");
    NSLibDownloadLibFile("NSViewController_PopoverPresentationController");
    NSLibDownloadLibFile("NSNavigationController");
    NSLibDownloadLibFile("NSPageController");
    NSLibDownloadLibFile("NSSplitViewController");
    NSLibDownloadLibFile("NSUIKit");
}

/*
    Window events mapping
*/

// window.onload = function()
// {
//     NSLibOnLoaded(this, function () {

//         _NSLibMainFn(null);
//     });
// };

// window.onresize = function(e)
// {
//     if (NSLibIsLoaded == false)
//         return;

//     var app = NSWebApplication.sharedInstance();
//     app.forwardResizeEvent.call(app, e);
// };

// window.addEventListener("click", function (e) {

//     if (NSLibIsLoaded == false)
//         return;

//     var app = NSWebApplication.sharedInstance();
//     app.forwardClickEvent.call(app, e.target, e.clientX, e.clientY);

//     //e.preventDefault();

// }, false);

// window.addEventListener('touchend', function(e){

//     if (NSLibIsLoaded == false)
//         return;

//     //TODO: Declare changedTouches interface for typescript
//     var touch = e.changedTouches[0] // reference first touch point for this event

//     var app = NSWebApplication.sharedInstance();
//     app.forwardClickEvent.call(app, e.target, touch.clientX, touch.clientY);

//     //e.preventDefault();

// }, false);

// // output errors to console log
// window.onerror = function (e) {
//     console.log("window.onerror ::" + JSON.stringify(e));
// };

