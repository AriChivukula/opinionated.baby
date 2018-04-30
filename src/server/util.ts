/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/util.ts::module>>
 * BESPOKE<<makeSync<T>, genNullOnThrow<T>>>
 * SIGNED<<2m34PnVVRoF9SFCHuaToEY4UQOiX8F+wA1aSsvAVttE67YwlTGsB8uP7m69x2hKn9S0oQPCfzlKN9/PhHi0L/Q==>>
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
