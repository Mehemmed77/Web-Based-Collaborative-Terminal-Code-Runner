export function determineFileExtension(filename: string) {
    const arr = filename.split(".");

    return arr[arr.length - 1];
}


