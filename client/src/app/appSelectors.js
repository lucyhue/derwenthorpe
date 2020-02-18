export const appSelectors = {

	theme: {
		currentTheme: (state) => state.app.themes[state.app.currentTheme],
		currentThemeKey: (state) => state.app.currentTheme,
		isTheme: (state, themeKey) => state.app.currentTheme === themeKey,
	},
};
