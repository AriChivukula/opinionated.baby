/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/util.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<JO2Uxo5FJqRw/ghAVr2Q8TPCn5dyd5QgFw+3mJpFayLxQ/oLehCDhofx/zzgZLYqyB8y0MKaqrTsJxNe/ns80w==>>
 */

/* BESPOKE START <<DEPRECATE>> */
export function makeSync<T>(wasAsync: Promise<T>): void {
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

export async function genNullOnThrow<T>(mightThrow: () => Promise<T>): Promise<T | null> {
  try {
    return await mightThrow();
  } catch (error) {
    console.log(error);

    return null;
  }
}
/* BESPOKE END <<DEPRECATE>> */
