import sharp from "sharp";

export const processImagesToBase64 = async (imageBuffers) => {
  try {
    const processedImages = await Promise.all(
      imageBuffers.map(async (buffer) => {
        const webpBuffer = await sharp(buffer)
          .resize({ width: 300 })
          .webp({ quality: 80 })
          .toBuffer();
        return webpBuffer.toString("base64");
      })
    );
    return processedImages;
  } catch (e) {
    console.error("Error processing images: ", e);
    throw e;
  }
};
