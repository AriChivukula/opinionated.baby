/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/util.ts::module>>
 * BESPOKE<<makeSync<T>, genNullOnThrow<T>>>
 * SIGNED<<cZLfMT7w3H1s5pqYnaUvqVjJPa2t27O1Q7OeVwXQrdhFt4ELz6V2GnHOFzqfZxnRNvVBCWtbiY8bGB5sihrEKg==>>
 */

export function makeSync<T>(
  wasAsync: Promise<T>,
): void {
  /* BESPOKE START <<makeSync<T>>> */
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
  /* BESPOKE END <<makeSync<T>>> */
}

export async function genNullOnThrow<T>(
  mightThrow: () => Promise<T>,
): Promise<T | null> {
  /* BESPOKE START <<genNullOnThrow<T>>> */
  try {
    return await mightThrow();
  } catch (error) {
    console.log(error);

    return null;
  }
  /* BESPOKE END <<genNullOnThrow<T>>> */
}
