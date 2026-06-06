type UIState = { theme: 'light' | 'dark' };

const uiState: UIState = { theme: 'light' };

export function getTheme() {
  return uiState.theme;
}

export function setTheme(t: UIState['theme']) {
  uiState.theme = t;
}
