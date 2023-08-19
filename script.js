const parallaxContainer = document.getElementById('parallaxContainer');
const itemsArray = [];
// setup general
const mouse = {
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.5,
};

// setup input
let input = {
  mouseX: {
    start: 0,
    end: window.innerWidth,
    current: mouse.x,
  },
  mouseY: {
    start: 0,
    end: window.innerWidth,
    current: mouse.y,
  },
};
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// setup output
let output = {
  blur: {
    start: 0.4,
    range: 16,
  },
  x: {
    start: -75,
    end: 75,
    current: 0,
  },
  y: {
    start: -75,
    end: 75,
    current: 0,
  },
  z: {
    range: 10000,
  },
};

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

// setup html
for (let i = 0; i < 100; i++) {
  // create new element with parallax-item className
  const item = document.createElement('div');
  item.className = 'parallax-item';
  itemsArray.push(item);
  // create new leaf for inside elements with leaf className
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  item.appendChild(leaf);
  // add element to container
  parallaxContainer.appendChild(item);

  //   css properties
  const bgImgNum = Math.round(Math.random() * 33);
  const rotateNum = Math.round(Math.random() * 180);
  const depth = Math.random();
  const blur = (output.blur.start - depth) * output.blur.range;
  const zIndex = output.z.range - depth * output.z.range;

  item.style.zIndex = zIndex;
  item.style.width = `${850 * Math.random() + 200}px`;
  item.style.height = `${850 * Math.random() + 200}px`;
  item.dataset.depth = Math.random();
  item.style.transform = `rotate(${rotateNum}deg)`;
  item.style.background = `url(./public/leafsAssets/asset-${bgImgNum}.png) center no-repeat`;
  item.style.backgroundSize = 'contain';
  item.style.filter = `blur(${blur}px)`;
  item.style.top = Math.round(Math.random() * 100 - 50) + '%';
  item.style.left = Math.round(Math.random() * 100 - 25) + '%';
}

const updateInputs = () => {
  input.mouseX.current = mouse.x;
  input.mouseY.current = mouse.y;
  input.mouseX.fraction =
    (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  input.mouseY.fraction =
    (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
};
const updateOutputs = () => {
  // output current
  output.x.current = output.x.end - input.mouseX.fraction * output.x.range;
  output.y.current = output.y.end - input.mouseY.fraction * output.y.range;
};
const updateParallaxItems = () => {
  // apply to html
  itemsArray.forEach((item, i) => {
    const depth = parseFloat(item.dataset.depth, 10);
    // const itemOutput = {
    //   x: output.x.current * depth,
    //   y: output.y.current * depth,
    // };

    // item.style.transform = `translate(${itemOutput.x}px, ${itemOutput.y}px)`;
    // Get the existing rotation value
    const currentTransform = item.style.transform;
    const rotationMatch = currentTransform.match(/rotate\(([^)]+)\)/);
    const currentRotate = rotationMatch ? rotationMatch[1] : '0deg';

    console.log(currentRotate);

    // Calculate the new translations
    const newX = output.x.current * depth;
    const newY = output.y.current * depth;

    // Combine existing rotation with new translations
    item.style.transform = `rotate(${currentRotate}) translate(${newX}px, ${newY}px)`;
  });
};

const handleMouseMove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  updateInputs();
  updateOutputs();
  updateParallaxItems();
};

const handleResize = () => {
  input.mouseX.end = window.innerWidth;
  input.mouseY.end = window.innerHeight;

  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
};

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);
