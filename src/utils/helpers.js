import nanoid from 'nanoid';

// delay exec func
export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// get random colors
const colors = ['lightblue', 'orange', 'lightgreen', 'pink', 'yellow', 'red', 'grey', 'magenta', 'cyan'];
export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export const genNanoid = () => nanoid();
