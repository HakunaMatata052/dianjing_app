module.exports = {
  presets: [
    "@vue/app",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [
    // ['import', {
    //   libraryName: 'vant',
    //   libraryDirectory: 'es',
    //   style: name => `${name}/style/less`
    // }, 'vant']
  ]
};
