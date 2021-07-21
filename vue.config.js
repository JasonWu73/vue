module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "~@/sass/abstracts/_variables.scss" as *;
          @use "~@/sass/abstracts/_mixins.scss" as *;
          @use "~@/sass/components/_form.scss" as *;
        `
      }
    }
  }
};
