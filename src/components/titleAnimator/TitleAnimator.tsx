import { useEffect } from 'react';

export default function TitleAnimator() {
  const titleText = `    POLICE ASSAULT IN PROGRESS    //`;

  function animateTitle() {
    const char = document.title[0];
    const newTitle = document.title.substr(1, document.title.length) + char;
    document.title = newTitle;
  }

  useEffect(() => {
    document.title = titleText;
    setInterval(() => {
      animateTitle();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
