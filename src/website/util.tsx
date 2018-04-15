export const isElectron = function(): boolean {
  return window && (window as any).process && (window as any).process.type;
}

export const goto = function(url: string): () => void {
  if (isElectron()) {
    return () => (window as any).require('electron').shell.openExternal(url);
  } else {
    return () => window.open(url, '_blank');
  }
}
