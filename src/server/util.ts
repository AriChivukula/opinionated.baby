export const makeSync: <T extends any>(wasAsync: Promise<T>) => void =
  <T extends any>(wasAsync: Promise<T>): void => {
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
  };

export const nullOnThrow: <T extends any>(mightThrow: Promise<T>) => Promise<T | null> =
  async <T extends any>(mightThrow: Promise<T>): Promise<T | null> => {
    try {
      return mightThrow;
    } catch (error) {
      console.log(error);

      return null;
    }
  };
