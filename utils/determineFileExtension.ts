export default function determineFileExtension(filename: string) {
    let extension = "";

    for(let i = filename.length - 1; i >= 0; i--) {
        if (filename[i] === ".") break;
        extension = filename[i] + extension;
    }

    return extension;
}