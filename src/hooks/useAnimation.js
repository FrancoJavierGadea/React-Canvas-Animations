import React, { useState, useEffect, useRef } from 'react';

export function useAnimation(canvasRef, animationFunction, opt = {}){

    const id = useRef(null);

    const [start, setStart] = useState(false);

    const [animation, setAnimation] = useState(() => animationFunction);

    const [options, setOptions] = useState(opt);

    useEffect(() => {

        if(start && animation && canvasRef.current){

            console.log('Start Animation');

            try {
                
                const anime = animation(canvasRef.current, options);
    
                const animate = () => {
                    
                    anime.draw();
                    
                    id.current = requestAnimationFrame(animate);
                }
    
                animate();
            }
            catch (error) {
                
                console.log(error);
            }
        }

        return () => {

            if(id.current) {

                console.log('Stop Animation');

                cancelAnimationFrame(id.current);

                id.current = null;
            }
        }
        
    }, [start, animation, options]);


    return { id, start, setStart, animation, setAnimation, options, setOptions };
}