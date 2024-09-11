import fileUpload from "express-fileupload";
import { PATH_TEMP_IMAGES } from "../config.js";
import path from "path";

export const uploadImages = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(PATH_TEMP_IMAGES),
});
