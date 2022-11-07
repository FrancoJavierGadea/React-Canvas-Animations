//* Crea un mapa de los pixeles de la imagen dibujada en el canvas obteniendo su color y alpha
export function getPhotoMap(canvas){

    let ctx = canvas.getContext('2d', { willReadFrequently: true });

    let ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    let map = [];

    for(let y = 0; y < ImageData.height; y++){

        let row = [];

        for(let x = 0; x < ImageData.width; x++){

            let R = ImageData.data[(y * 4 * ImageData.width) + (x * 4)];
            let G = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 1)];
            let B = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 2)];

            let A = Math.sqrt((R*R)*0.299 + (G*G)*0.587 + (B*B)*0.114)/100;

            let cell = { alpha: A, color: `rgb(${R}, ${G}, ${B})` };

            row.push(cell);
        }

        map.push(row);
    }

    console.log('creating map');

    return map;
}