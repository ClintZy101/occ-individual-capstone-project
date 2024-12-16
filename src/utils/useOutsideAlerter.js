import { useEffect } from "react";

export default function useOutsideAlerter(ref, setAccountDropdownIsActive, accountDropdownIsActive) {
  
    useEffect(() => {
 
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && accountDropdownIsActive === true) {
          setAccountDropdownIsActive(false)
        //   alert('clicked outside dropdown')
        } 
      }

    //   listen to clicks outside dropdown component
        document.addEventListener("mousedown", handleClickOutside);
      
    }, [ref, setAccountDropdownIsActive, accountDropdownIsActive]);
  }
  
