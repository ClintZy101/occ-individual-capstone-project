import { useEffect, useState } from "react";

export default function scrollHook() {
  const scrollThreshold = 300;
  const [bannerIsHidden, setBannerIsHidden] = useState(false);
  useEffect(() => {
    // Function to handle scroll behavior
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      //   console.log(scrollPosition)

      // Hide sub-navbar when scroll position goes past the threshold
      if (scrollPosition > scrollThreshold) {
        setBannerIsHidden(true);
      } else {
        setBannerIsHidden(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { bannerIsHidden, setBannerIsHidden };
}
