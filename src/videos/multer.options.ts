import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Define the destination folder for uploaded files
    filename: (req, file, callback) => {
      const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // Generate a unique filename for the uploaded file
      callback(null, randomName + extname(file.originalname));
    },
  }),

  limits: {
    fileSize: 1024 * 1024 * 20, // Set maximum file size (20 MB)
  },

  fileFilter: (req, file, callback) => {
    // Validate the file type of the uploaded file (only MP4 videos are allowed)
    if (file.mimetype === 'video/mp4') {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type. Only MP4 videos are allowed.'));
    }
  },
};
