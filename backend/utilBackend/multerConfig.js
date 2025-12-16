import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to create storage for different folders
const createStorage = (subfolder) => multer.diskStorage({
    destination: (req, file, cb) => {
        // Points to uploads/profilePictures or uploads/postPictures
        cb(null, path.join(__dirname, '/../uploads', subfolder));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Create and export two different middleware tools
export const uploadProfilePicture = multer({ storage: createStorage('profilePictures') });
export const uploadPostPicture = multer({ storage: createStorage('postPictures') });