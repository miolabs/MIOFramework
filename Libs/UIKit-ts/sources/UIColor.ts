/**
 * Created by godshadow on 11/3/16.
 */

import { NSObject } from "foundation"


export class UIColor extends NSObject
{
  hex: string
  
  initDisplayP3RedCGFloatGreenCGFloatBlueCGFloatAlphaCGFloat(r: number, g: number, b: number, a: number) {
    let rS = r.toString(16)
    if(rS.length < 2) rS = '0' + rS
    let gS = g.toString(16)
    if(gS.length < 2) gS = '0' + gS
    let bS = b.toString(16)
    if(bS.length < 2) bS = '0' + bS
    let aS = Math.floor(a * 255).toString(16)
    if(aS.length < 2) aS = '0' + aS
    this.hex = rS + gS + bS + aS
  }
}
