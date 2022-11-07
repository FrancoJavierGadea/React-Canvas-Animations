import React, { useState, useEffect, useRef } from 'react';


export function useAnimation(canvasRef, animationFunction){

    const id = useRef(null);

    const [start, setStart] = useState(false);

    const [animation, setAnimation] = useState(() => animationFunction);

    const [animationOptions, setAnimationOptions] = useState({});

    const [PhotoMap, setPhotoMap] = useState(null);

    useEffect(() => {

        if(start && animation && canvasRef.current){

            console.log('Start Animation');

            const anime = PhotoMap ? animation(canvasRef.current, PhotoMap, animationOptions) : animation(canvasRef.current, animationOptions);

            const animate = () => {
                
                anime.draw();
                
                id.current = requestAnimationFrame(animate);
            }

            animate();
        }
        else {

            if(id.current) {

                console.log('Stop Animation 2');
                cancelAnimationFrame(id.current);
                id.current = null;
            }
        }

        return () => {

            if(id.current) {

                console.log('Stop Animation');
                cancelAnimationFrame(id.current);
                id.current = null;
            }
        }
        
    }, [start, animation, animationOptions]);


    return [id.current, start, setStart, animation, setAnimation, animationOptions, setAnimationOptions, setPhotoMap];
}