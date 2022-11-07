//Alfabeto Por defecto
export const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

export const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const nums = '0123456789';


class Letter {

    constructor(canvas, alphabet, opt = {}){

        //* Canvas
            this.canvas = canvas;
            
            this.ctx = canvas.getContext('2d');

            this.width = canvas.width;

            this.height = canvas.height;

        //* Opciones 
            this.options = {
                color: '#00ff00',
                fontSize: 16,
                velocity: 1.5,
                x: 0,
                y: 0,
                ...opt
            };

        //* Posicion
            this.x = this.options.x;
            this.y = this.options.y;    

        //* Alfabeto    
            this.alphabet = alphabet ? alphabet : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        //* Tamaño   
            this.fontSize = this.options.fontSize;
            
        //* Velocidad
            this.velocity = Math.random() * this.options.velocity;    


        //! Interval   
        this.activateInterval = true;
        
        this.char = this.alphabet.charAt( Math.floor(Math.random() * this.alphabet.length) );
    }

    draw(){

        //* Color
        switch(true){

            case typeof this.options.color === 'string':

                this.ctx.fillStyle = this.options.color;
                break;

            case Array.isArray(this.options.color) && this.options.color.length > 0:

                this.ctx.fillStyle = this.options.color[ Math.floor(Math.random() * this.options.color.length) ];
                break;
                
            default:
                this.ctx.fillStyle = '#00ff00';  
        }

        //Fuente
        this.ctx.font = this.options.fontSize + 'px monospace';

        //Actualzar el Caracter cada 100 ms mientras la animacion este activa
        if(this.activateInterval){

            this.activateInterval = false;

            setTimeout(() => {

                this.char = this.alphabet.charAt( Math.floor(Math.random() * this.alphabet.length) );

                this.activateInterval = true;

            }, 1000/30)
        }

        //Dibujar el caracter (text, x, y)
        this.ctx.fillText(this.char, this.x * this.fontSize, this.y * this.fontSize);
           
        this.update();
    }

    update(){

        if( this.y * this.fontSize > this.height  &&  Math.random() > 0.975 ){

            this.y = 1;
        }
        else {

            let movement = this.velocity;
        
            this.y += movement;
        }
    }
}



export const MatrixAnimation = (canvas, opt = {}) => {

    if(!canvas) return null;

    let options = {
        image: undefined,
        alphabet: katakana + latin + nums,
        particle: {},
        ...opt
    }

    //Tamaño de la Fuente por defecto 
    const fontSize = options.particle.fontSize || 16;

    const columns = Math.round( canvas.width/fontSize );

    const rainDrops = new Array(columns);

    for (let i = 0; i < rainDrops.length; i++){

        rainDrops[i] = new Letter(canvas, options.alphabet, {
            
            x: i,

            ...options.particle
        });
    }

    return {
        draw: () => {

            const ctx = canvas.getContext('2d');

            //Draw Image
            if(options.image){
                ctx.globalAlpha = 0.05; 
                ctx.drawImage(options.image, 0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
            }

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            //Dibuja las letras 1 por columna   
            rainDrops.forEach((l)=>{

                l.draw();
            });
        }
    }
}

