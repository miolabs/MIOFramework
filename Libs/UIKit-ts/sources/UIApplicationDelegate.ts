import { UIApplication } from "./UIApplication";
import { UISceneConfiguration } from "./UISceneConfiguration";
import { UISceneConnectionOptions } from "./UISceneConnectionOptions";
import { UISceneSession } from "./UISceneSession";
import { UIWindow } from "./UIWindow";

export interface UIApplicationDelegate 
{
  window: UIWindow;
  applicationDidFinishLaunchingWithOptions( application:UIApplication, launchOptions:any): boolean;
  applicationConfigurationForConnectingSceneSession( application:UIApplication, connectingSceneSession:UISceneSession, options:UISceneConnectionOptions): UISceneConfiguration;
  applicationDidDiscardSceneSessions(application:UIApplication, sceneSessions:Set<UISceneSession>) : void;
}