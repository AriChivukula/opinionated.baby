/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/website.ts::utility>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
export function goto(
  url: string,
  samePage: boolean = false,
): void {
  if (samePage) {
    // @ts-ignore
    window.location = url;
  } else {
    window.open(url);
  }
}
/* BESPOKE END <<custom>> */
