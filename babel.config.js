module.exports = function (api) {
  // api.cache(true);
  api.cache.forever();
  return {
    presets: ["babel-preset-expo"],
  };
};
