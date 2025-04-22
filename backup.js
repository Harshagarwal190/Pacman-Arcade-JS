class pacman {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT; // Default direction
    this.nextDirection = DIRECTION_RIGHT;
    this.currentFrame = 1;
    this.frameCount = 7;
    this.totalFrames = 2; // or however many frames you have

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveprocess() {
    this.changeDirectionIfPossible();
    this.movefroward();
    if (this.checkcollision()) {
      this.movebackward();
    }
  }
  eat() {}

  movefroward() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y += this.speed;
        break;
    }
  }
  movebackward() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION_UP:
        this.y += this.speed;
        break;
      case DIRECTION_LEFT:
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y -= this.speed;
        break;
    }
  }
  checkcollision() {
    let iscollided = false;
    if (
      map[this.getmapy()][this.getmapx()] == 1 ||
      map[this.getmapyRightSide()][this.getmapx()] == 1 ||
      map[this.getmapy()][this.getmapxRightSide()] == 1 ||
      map[this.getmapyRightSide()][this.getmapxRightSide()] == 1
    ) {
      return true;
    }
    return false;
  }
  checkghostcollision() {}
  changeDirectionIfPossible() {
    if (this.direction == this.nextDirection)return;
    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.movefroward();
    if (this.checkcollision()) {
        this.movebackward();
        this.direction = tempDirection;
  }else{
    this.movebackward();
  }
}

//   changeAnimation() {
//     this.currentFrame =
//     this.currentFrame == this.currentFrame ? 1 : this.currentFrame + 1;
//   }

changeAnimation() {
    this.currentFrame = (this.currentFrame % this.totalFrames) + 1;
  }
  

  draw() {
    canvasContext.save();
    canvasContext.translate(
      this.x + oneblocksize / 2,
      this.y + oneblocksize / 2
    );
    canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
    
    canvasContext.translate(
      -this.x - oneblocksize / 2,
      -this.y - oneblocksize / 2
    );
    canvasContext.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * oneblocksize,
      0,
      oneblocksize,
      oneblocksize,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
  }

  getmapx() {
    return parseInt(this.x / oneblocksize);
  }

  getmapy() {
    return parseInt(this.y / oneblocksize);
  }

  getmapxRightSide() {
    return parseInt((this.x + 0.9999 * oneblocksize) / oneblocksize);
  }

  getmapyRightSide() {
    return parseInt((this.y + 0.9999 * oneblocksize) / oneblocksize);
  }
}
