import Dexie from "dexie";
import { any } from "prop-types";

const db = new Dexie('images_db');
db.version(1).stores({
    image: '++id,file'
});

export const add = async (files) => {
    files.forEach(async file => {
        console.log(await db.image.add(file));
    });
};

export const fileExists = async () => {
    const files = await db.image.toArray();
    return files.length > 0;
}

export const findAll = async () => {
    return await db.image.toArray();
}

export const removeAll = () => {
    db.image.clear();
}

export const findByFavoriteImage = async () => {
    const allImages = await db.image.toArray();
    const favorite = allImages[0];
    
    return URL.createObjectURL(favorite);
}

export const convertFilesToFormData = async () => {
    if (!fileExists()) { return };
    const files = await db.image.toArray();

    const formData = new FormData();

    files.forEach(file => {
        formData.append("file", file);
    });

    return formData;
}

export const remove = (name) => {

}