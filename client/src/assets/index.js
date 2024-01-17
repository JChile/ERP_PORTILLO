// assets/index.js
const importAll = (context) => context.keys().forEach(context);
importAll(require.context("./", false, /\.(png)$/));
