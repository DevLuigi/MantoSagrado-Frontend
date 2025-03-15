export function newFile(img, index) {
    const byteCharacters = atob(img.file); // Decodifica base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i); // Converte para bytes
    }
    const byteArray = new Uint8Array(byteNumbers); // array de bytes
    const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpeg' });
    const file = new File([blob], `image_${index + 1}.jpg`, { type: blob.type });
    
    return file;
}