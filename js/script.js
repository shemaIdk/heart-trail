const MIN_DURATION = 1;
const MAX_DURATION = 2;

const MIN_SIZE = 10;
const MAX_SIZE = 100;

class AutoMode {
  constructor(options) {
    this.delay = options.delay;

    this.intervalId = 0;
    this.isActive = false;
  }

  enable() { 
    this.autoModeIntervalId = setInterval(function() {
      const randPosX = Math.floor(Math.random() * document.body.clientWidth - 100) + 100;
      const randPosY = Math.floor(Math.random() * document.body.clientHeight - 100) + 100;
      console.log(randPosX, randPosY)
      const heart = createHeart(randPosX, randPosY);
      document.body.appendChild(heart);
    }, this.delay)

    this.isActive = true;
  }
  disable() {
    clearInterval(this.autoModeIntervalId);
    this.isActive = false;
  }
}

const autoMode = new AutoMode({
  delay: 30
});

document.body.addEventListener('keypress', function(e) {
  if(e.key == 'a') {
    autoMode.isActive ? autoMode.disable() : autoMode.enable();
  }
})

document.body.addEventListener('mousemove', function(event) {
  const heart = createHeart(event.pageX, event.pageY);
  this.appendChild(heart);
})


function createHeart(posX, posY) {
  const heartEl = document.createElement('div');
  heartEl.className = 'heart';

  const duration = Math.floor(Math.random() * MAX_DURATION) + MIN_DURATION;
  const size = Math.floor(Math.random() * MAX_SIZE) + MIN_SIZE;

  heartEl.style.animationDuration = duration+'s';
  heartEl.style.width = heartEl.style.height = size + 'px';
  [heartEl.style.left, heartEl.style.top] = [posX + 'px', posY + 'px'];
  
  
  setTimeout(() => heartEl.remove(), duration * 1000);
  return heartEl;
}