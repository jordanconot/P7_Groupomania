import React from 'react';
import { useEffect, useState } from 'react';

const ScrollTopButton = () => {
  const [scrollTopButton, setScrollTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 650) {
        setScrollTopButton(true);
      } else {
        setScrollTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      {scrollTopButton && (
        <button
          style={{
            position: 'fixed',
            bottom: '25px',
            right: '50px',
            height: '50px',
            width: '50px',
            fontSize: '50px',
            backgroundColor: 'black',
            padding: 0,
            borderRadius: '20px',
          }}
          onClick={scrollUp}
        >
          ^
        </button>
      )}
    </div>
  );
};

export default ScrollTopButton;
