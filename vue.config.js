module.exports = {
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "~@/styles/_variables.scss";
					@import "~@/styles/_fonts.scss";
					@import "~@/styles/app.scss";
					@import "~@/styles/_overrides.scss";
				`
			}
		}
	}
};
