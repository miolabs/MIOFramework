import { UIWindow } from "./UIWindow";


export interface UIApplicationDelegate {

  window: UIWindow
  applicationDidFinishLaunchingWithOptions(): void
}