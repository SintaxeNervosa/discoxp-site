import Dexie from "dexie";
import { getImage, getProductById } from "../connection/productPaths";

const db = new Dexie('db_discoxp');
db.version(1).stores({
    image: '++id,file',
    cart: 'id, name, quantity, price, file'
});

export const addProductInCart = async (id) => {
    const responseProductFindById = await findProductCartById(id);

    console.log(responseProductFindById);
    console.log("ID" + id);
    if (responseProductFindById != undefined) {
        console.log("caiu aqui!");
        await putProductQuantity(id, responseProductFindById.quantity + 1);
        return;
    };

    const tempProduct = await getProductById(id);
    const data = tempProduct.data;

    const tempImage = await getImage(data.id);
    const imageInBase64 = tempImage.data[0].imageData;

    const obj = {
        id: data.id,
        name: data.name,
        quantity: 1,
        price: data.price,
        file: imageInBase64
    }

    await db.cart.add(obj);
}

export const putProductQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
        return await deleleItem(id);
    }

    const product = await db.cart.get(id);
    product.quantity = newQuantity;

    return await db.cart.put(product);
}

export const findProductCartById = async (id) => {
    return await db.cart.get(id);

}

export const deleleItem = async (id) => {
    const response = db.cart.delete(id);
    console.log(response);
}

export const findAllProductsByCart = async () => {
    return await db.cart.toArray();
}

// image
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