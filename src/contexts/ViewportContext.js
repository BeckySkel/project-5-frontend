// External imports
import { useEffect, useState } from "react";

/*
https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
*/
function useViewport() {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    return { width };
  }

  export default useViewport;