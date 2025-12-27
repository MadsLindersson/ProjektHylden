import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createStorage = (subfolder) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/../uploads', subfolder));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const uploadProfilePicture = multer({ storage: createStorage('profilePictures') });
export const uploadPostPicture = multer({ storage: createStorage('postImages') });