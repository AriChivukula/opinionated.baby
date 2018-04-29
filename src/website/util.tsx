/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website/util.ts::module>>
 * BESPOKE<<isElectron, goto>>
 * SIGNED<<xBxv0B3J3LIX6ge7SArkKEWvb6zXpMpNIt4+sh+jmU/rNDbC5zDKoJedvc0pR6XZYNGaXVeBBjjYRoAlqMc/9A==>>
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
