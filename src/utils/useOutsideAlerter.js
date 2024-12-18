import { useEffect } from "react";

export default function useOutsideAlerter(ref, setIsActive, isActive) {
  
    useEffect(() => {
 
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isActive === true) {
          setIsActive(false)
        //   alert('clicked outside dropdown')
        } 
      }

    //   listen to clicks outside dropdown component
        document.addEventListener("mousedown", handleClickOutside);
      
    }, [ref, setIsActive, isActive]);
  }
  
