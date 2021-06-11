import { useRef, useEffect } from 'react';

export default ({ handleClickIn = () => {}, handleClickOut = () => {} }) => {
    const node = useRef();

    const handleClick = e => {
        if (node.current && node.current.contains(e.target)) {
          // inside click
          //handleClickIn()
          //return;
          return
        } else {
            // outside click 
            handleClickOut()
        }
        
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [])

    return node;
}