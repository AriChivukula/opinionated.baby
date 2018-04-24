export function isElectron(): boolean {
  return "process" in window;
}

export function goto(url: string, samePage: boolean = false): void {
  if (isElectron()) {
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
}
