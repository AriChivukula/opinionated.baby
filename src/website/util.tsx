export const isElectron: () => boolean =
  (): boolean => "process" in window;

export const goto: (url: string, samePage?: boolean) => void =
  (url: string, samePage: boolean = false): void => {
    if (isElectron()) {
      // tslint:disable-next-line:no-any
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
  };
