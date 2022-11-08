import React, { useState, useEffect, useRef } from 'react';


export function useAnimation(canvasRef, animationFunction){

    const id = useRef(null);

    const [start, setStart] = useState(false);

    const [animation, setAnimation] = useState(() => animationFunction);

    const [animationOptions, setAnimationOptions] = useState({});

    useEffect(() => {

        if(start && animation && canvasRef.current){

            console.log('Start Animation');

            const anime = animation(canvasRef.current, animationOptions);

            const animate = () => {
                
                anime.draw();
                
                id.current = requestAnimationFrame(animate);
            }

            animate();
        }

        return () => {

            if(id.current) {

                console.log('Stop Animation');
                cancelAnimationFrame(id.current);
                id.current = null;
            }
        }
        
    }, [start, animation, animationOptions]);


    return [id.current, start, setStart, animation, setAnimation, animationOptions, setAnimationOptions];
}