export const detectDevTools = (threshold = 160) => {
  return window.outerWidth - window.innerWidth > threshold;
};

export const preventDevTools = () => {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
    }
  });
};