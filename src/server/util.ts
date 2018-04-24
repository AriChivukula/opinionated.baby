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
