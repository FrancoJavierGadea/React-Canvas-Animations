import React, { useState, useEffect, useRef } from 'react';


export function useAnimation(aux){

    const id = useRef(null);

    const [start, setStart] = useState(false);

    const [animation, setAnimation] = useState(aux);


    useEffect(() => {

        if(start === true){

            console.log('Start Animation');

            const animate = () => {
                
                animation.draw();
                
                id.current = requestAnimationFrame(animate);
            }

            animate();
        }
        else {

            if(id) {

                cancelAnimationFrame(id.current);
                console.log('Stop Animation');
            }
        }

        return () => {

            cancelAnimationFrame(id.current);
        }
        
    }, [start, animation]);


    useEffect(() => {

        console.log('Change Animation');

        id.current = null;

        //setStart(false);
        
    }, [animation]);

    return [id.current, start, setStart, animation, setAnimation];
}