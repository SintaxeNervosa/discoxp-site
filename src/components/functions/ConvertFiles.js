const filemane = "file";

export const base64ToFile = async (...base64) => {
    let blobs = [];

    for (let i = 0; i < base64[0].length; i++) {
        let resp = await fetch(base64[0][i]);
        let blob = await resp.blob();

        blobs = [...blobs, blob];
    }

    let files = [];

    blobs.forEach((blob) => {
        files = [...files, new File([blob], filemane, { type: blob.type })];
    });

    return files;
};

