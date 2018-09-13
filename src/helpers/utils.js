// delay exec func
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// get random colors
const colors = ['lightblue', 'orange', 'lightgreen', 'pink', 'yellow', 'red', 'grey', 'magenta', 'cyan'];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export default { delay, getRandomColor };
