export async function urlToBlob(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
}

export async function urlToFile(url, mimeType) {
    const blob = await urlToBlob(url);
    const file = new File([blob], 'image1.png' ,  { type: mimeType });
    return file;
}