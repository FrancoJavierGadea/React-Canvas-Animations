
//Particula
class Particle {

    constructor(canvas, opt = {}){

        //* Canvas
            this.canvas = canvas;
        
            this.ctx = canvas.getContext('2d');

            this.width = canvas.width;

            this.height = canvas.height;

        //* Opciones 
            this.options = {
                color: '#ffffff',
                velocity: 1.5,
                ...opt
            };

        //* Posicion
            this.x = Math.random() * this.canvas.width;
            this.y = 0;

        //* Tamaño 1 a 2.5 pixeles
            this.size = Math.random() * 1.5 + 1;

        //* Velocidad
            this.velocity = Math.random() * this.options.velocity;
    }

    update(){

        let movement = this.velocity;
        
        this.y += movement;

        //Reinicia la posicion a arriba
        if( this.y >= this.height ){

            this.x = Math.random() * this.width;     this.y = 0; 
        }
    }

    draw(){

        this.ctx.fillStyle = this.options.color;
        
        this.ctx.globalAlpha = 0.5;
        
        this.ctx.beginPath();
        
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        
        this.ctx.fill();

        this.update();
    }
}


export const SnowAnimation = (canvas, opt = {}) => {

    if(!canvas) return null;

    let options = {
        image: undefined,
        drawImage: false,
        number: 5000,
        particle: {},
        ...opt
    }

    
    //* Clear the canvas
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    //* Set Particles
    let Particles = [];

    for(let i = 0; i < options.number; i++){

        Particles.push(new Particle(canvas, options.particle));
    }


    return {
        draw: () => {

            const ctx = canvas.getContext('2d');

            //Draw Image
            if(options.drawImage && options.image){

                ctx.drawImage(options.image.img, 0, 0, canvas.width, canvas.height);
            } 

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

export const optionsDefaultValue = {

    image: undefined,

    drawImage: false,

    number: 5000,

    particle: {
        
        color: '#ffffff',

        velocity: 1.5,
    }
}