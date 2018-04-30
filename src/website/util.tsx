/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/util.ts::module>>
 * BESPOKE<<isElectron, goto>>
 * SIGNED<<Qlh1wB567St9Hxl0DcpiAIhlOW72voU/iN+BYp107o+AUPG+DM574WKZ69NeO3KLsx0Io9tPRalf0h4rfT3RyQ==>>
 */

export function isElectron(
): boolean {
  /* BESPOKE START <<isElectron>> */
  return "process" in window;
  /* BESPOKE END <<isElectron>> */
}

export function goto(
  url: string,
  samePage: boolean = false,
): void {
  /* BESPOKE START <<goto>> */
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
  /* BESPOKE END <<goto>> */
}
