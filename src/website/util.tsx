export const isElectron: () => boolean =
  (): boolean => "process" in window;

export const goto: (url: string) => void =
  (url: string): void => {
    if (isElectron()) {
      // tslint:disable-next-line:no-any
      (window as any)
        .require("electron")
        .shell
        .openExternal(url);
    } else {
      window.open(url, "_blank");
    }
  };
