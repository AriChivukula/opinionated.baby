export const isElectron = function(): bool {
  return window && window.process && window.process.type;
}

export const goto = function(url: string): () => void {
  if (isElectron()) {
    return () => window.require('electron').shell.openExternal(url);
  } else {
    return () => window.open(url, '_blank');
  }
}
