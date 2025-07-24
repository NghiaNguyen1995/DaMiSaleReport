const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');


const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

/*const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const { assetExts } = defaultConfig.resolver;

  return mergeConfig(defaultConfig, {
    resolver: {
      assetExts: [...assetExts, 'gif'], // Thêm hỗ trợ .gif
    },
  });
})();*/
