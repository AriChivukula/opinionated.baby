/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/util.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<JO2Uxo5FJqRw/ghAVr2Q8TPCn5dyd5QgFw+3mJpFayLxQ/oLehCDhofx/zzgZLYqyB8y0MKaqrTsJxNe/ns80w==>>
 */

/* BESPOKE START <<DEPRECATE>> */
export function isElectron(): boolean {
  return "process" in window;
}

export function goto(url: string, samePage: boolean = false): void {
  if (isElectron()) {
    (window as any)
      .require("electron")
      .shell
      .openExternal(url);
  } else {
    if (samePage) {
      // @ts-ignore
      window.location = url;
    } else {
      window.open(url);
    }
  }
}
/* BESPOKE END <<DEPRECATE>> */
