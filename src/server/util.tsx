// tslint:disable-next-line:no-any
export const prep: <T extends any>(genable: Promise<T>) => void =
  // tslint:disable-next-line:no-any
  <T extends any>(genable: Promise<T>): void => {
    genable
      .catch((err: Error): void => {
        throw err;
      })
      .then((): void => {
        return;
      })
      .catch((err: Error): void => {
        throw err;
      });

    return;
  };
