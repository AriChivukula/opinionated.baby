/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::Util>>
 * BESPOKE<<goto>>
 * SIGNED<<xmEAmBCNkmKkh5J4cChPNmzfMV9za8dykTqYkxcp6vXCxNnsX9pYsV8JaGtW9B+ec5kmTEUgb0MctNZrBsQX3Q==>>
 */

export function goto(
  url: string,
  samePage: boolean = false,
): void {
  /* BESPOKE START <<goto>> */
  if (samePage) {
    // @ts-ignore
    window.location = url;
  } else {
    window.open(url);
  }
  /* BESPOKE END <<goto>> */
}
