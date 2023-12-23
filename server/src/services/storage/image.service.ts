import fs from 'fs';
import path from 'path';
import {v4} from 'uuid';

const images = 'images';
const dir = path.join(process.cwd(), images);
assertDirExists(dir);

function assertDirExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true});
    }
}

export function saveImage(imageData: any, imageType: string): string {
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

export function findPath(token: string): string | null {
    const files = fs.readdirSync(dir);
    const file = files.find(f => f.startsWith(token));
    if(!file) {
        return null;
    }
    return path.join(images, file);
}
