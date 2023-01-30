import { NSObject } from "foundation";

export enum UISceneSessionRole
{
    windowApplication,
    windowExternalDisplayNonInteractive,
    carTemplateApplication,
    CPTemplateApplicationDashboardSceneSessionRoleApplication,
    CPTemplateApplicationInstrumentClusterSceneSessionRoleApplication
}

export class UISceneSession extends NSObject
{
    role:UISceneSessionRole;
}