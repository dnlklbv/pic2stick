const jimp = require('jimp');

const processImage = async (src) => {
  const img = await jimp.read(src);
  const buffer = await img.scaleToFit(512, 512).getBufferAsync(jimp.MIME_PNG);
  return buffer;
};

module.exports = processImage;
