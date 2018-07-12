/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::utility>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
export function makeSync<T>(
  wasAsync: Promise<T>,
): void {
  wasAsync
    .catch((err: Error): void => {
      console.log(err);
    })
    .then((): void => {
      return;
    })
    .catch((err: Error): void => {
      console.log(err);
    });

  return;
}

export async function genNullOnThrow<T>(
  mightThrow: () => Promise<T>,
): Promise<T | null> {
  try {
    return await mightThrow();
  } catch (error) {
    console.log(error);

    return null;
  }
}
/* BESPOKE END <<custom>> */
