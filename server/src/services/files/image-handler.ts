import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

const baseDir: string = process.env.BASE_DIR as string;
const dir = path.join(baseDir, 'images');
assertDirExists(dir);

function assertDirExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true});
    }
}

function saveImage(imageData: any, imageType: string): string {
    const token = v4();
    const ext = imageType.split('/')[1];
    fs.writeFile(
        path.join(dir, `${token}.${ext}`),
        imageData,
        (err) => {
            if (err) {
                console.log('Error saving image with id ' + token, err);
            }
        });

    return token;
}

function findPath(token: string): string {
    const files = fs.readdirSync(dir);
    const file = files.find(f => f.startsWith(token));
    if(!file)
        throw new Error('File not found');
    return path.join(dir, file);
}

function getImage(token: string, consumer: (ext: string, data: Buffer) => void) {
    const imagePath = findPath(token);
    const imageType = imagePath.split('.').pop();
    fs.readFile(imagePath, (err, data) => {
        if(err) {
            console.log('Error reading file ' + imagePath, err);
            throw err;
        }
        consumer(imageType as string, data);
    });
}

export default {
    saveImage,
    getImage
}