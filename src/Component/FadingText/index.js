import React, { useState, useEffect } from 'react';

function TypewriterText({ text, typingSpeed = 100, delay = 1000 }) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let timeout;

    const typeNextCharacter = (index) => {
      if (index <= text.length) {
        setVisibleText(text.substring(0, index));
        timeout = setTimeout(() => {
          typeNextCharacter(index + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setVisibleText('');
          timeout = setTimeout(() => {
            typeNextCharacter(1);
          }, typingSpeed);
        }, delay);
      }
    };

    typeNextCharacter(1);

    return () => clearTimeout(timeout);
  }, [text, typingSpeed, delay]);

  return <div>{visibleText}</div>;
}

export default TypewriterText;
