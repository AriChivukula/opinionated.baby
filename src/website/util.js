// @flow

export const isElectron = function(): bool {
  return window && window.process && window.process.type;
}

export const goto = function(url: string): void {
  if (isElectron()) {
    window.require('electron').shell.openExternal(url);
  } else {
    window.open(url, '_blank');
  }
}
