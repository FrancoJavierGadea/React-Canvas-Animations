
//Particula
class Particle {

    constructor(canvas, PhotoMap, opt = {}){

        //* Canvas
            this.canvas = canvas;
        
            this.ctx = canvas.getContext('2d', { willReadFrequently: true });

            this.width = canvas.width;

            this.height = canvas.height;

        //* Mapa de pixeles
            this.PhotoMap = PhotoMap;    

        //* Opciones 
            this.options = {
                mapColor: false,
                color: '#ffffff',
                velocity: 1.5,
                ...opt
            };

        //* Posicion
            this.x = Math.random() * this.canvas.width;
            this.y = 0;

        //* Map Position
            this.mapX = Math.floor(this.x);
            this.mapY = Math.floor(this.y);    

        //* Tamaño 1 a 2.5 pixeles
            this.size = Math.random() * 1.5 + 1;

        //* Velocidad
            this.velocity = Math.random() * this.options.velocity;

            this.speed = 0;
    }

    update(){

        //* Reaccion de la Particula al Mapa
            this.mapX = Math.floor(this.x);
            this.mapY = Math.floor(this.y);

            this.speed = this.PhotoMap[this.mapY][this.mapX].alpha;

        let movement = (2.9 - this.speed) + this.velocity;
        
        this.y += movement;

        //* Reinicia la posicion a arriba
        if( this.y >= this.height ){

            this.x = Math.random() * this.width;     this.y = 0; 
        }
    }

    draw(){

        this.update();

        //* Color
        switch(true){

            case this.options.mapColor === true:

                this.ctx.fillStyle = this.PhotoMap[this.mapY][this.mapX].color;
                break

            case typeof this.options.color === 'string':

                this.ctx.fillStyle = this.options.color;
                break;

            case Array.isArray(this.options.color) && this.options.color.length > 0:

                this.ctx.fillStyle = this.options.color[ Math.floor(Math.random() * this.options.color.length) ];
                break;
                
            default:
                this.ctx.fillStyle = '#ffffff';  
        }
        
        this.ctx.globalAlpha = this.speed * 0.5;
        
        this.ctx.beginPath();
        
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        
        this.ctx.fill();
    }

    set setColor(color){

        this.options.color = color;
    }

    get getColor(){

        return this.options.color;
    }
}







export const DrawImageRain = (canvas,  PhotoMap, opt = {}) => {

    if(!canvas) return null;

    let options = {
        image: undefined,
        number: 5000,
        particle: {},
        ...opt
    }

    if(!options.image) throw new Error('This animation require a image');


    //* Clear
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    let Particles = [];

    for(let i = 0; i < options.number; i++){

        Particles.push(new Particle(canvas, PhotoMap, options.particle));
    }

    return {
        draw: () => {
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            //Draw Image
            //ctx.drawImage(options.image, 0, 0, canvas.width, canvas.height);
            

            //Clear scream
            ctx.globalAlpha = 0.05;

            ctx.fillStyle = "#000";
        
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //Draw Particles
            Particles.forEach((p) => {

                p.draw();
            })
        }
    }
}


