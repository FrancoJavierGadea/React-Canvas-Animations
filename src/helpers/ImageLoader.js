export async function getBase64(file) {

    if(!file) return Promise.reject("File is undefined");

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (e) => {

            resolve({
                base64: e.target?.result
            });
        }

        reader.onerror = (e) => {

            reject(`Error occurred reading file: ${file.name}`)
        }
    });
}

