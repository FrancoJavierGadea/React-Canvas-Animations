import React, { useState, useEffect, useRef } from 'react';
import { getPhotoMap } from '../helpers/PhotoMap';


export function useAnimation(canvasRef, animationFunction){

    const id = useRef(null);

    const [start, setStart] = useState(false);

    const [animation, setAnimation] = useState(() => animationFunction);

    const [animationOptions, setAnimationOptions] = useState({});

    useEffect(() => {

        if(start && animation && canvasRef.current){

            console.log('Start Animation');

            try {
                
                const anime = animation(canvasRef.current, animationOptions);
    
                const animate = () => {
                    
                    anime.draw();
                    
                    id.current = requestAnimationFrame(animate);
                }
    
                animate();
            }
            catch (error) {
                
                if(error.cause === 'photoMap'){

                    let {img, width, height} = animationOptions.image;

                    const photoMap = getPhotoMap(img, width, height);

                    setAnimationOptions({
                        ...animationOptions,
                        photoMap
                    })
                }
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


    return [id.current, start, setStart, animation, setAnimation, animationOptions, setAnimationOptions];
}