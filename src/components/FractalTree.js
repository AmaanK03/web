import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";

const Sketch = p5 => {
  let stars = [];
  const numStars = 1000;

  class Star {
    constructor() {
      this.x = p5.random(-p5.width, p5.width);
      this.y = p5.random(-p5.height, p5.height);
      this.z = p5.random(p5.width);
    }

    update() {
      this.z = this.z - p5.frameCount % 5;
      if (this.z < 1) {
        this.z = p5.width;
        this.x = p5.random(-p5.width, p5.width);
        this.y = p5.random(-p5.height, p5.height);
      }
    }

    show() {
      p5.fill(255);
      p5.noStroke();

      const sx = p5.map(this.x / this.z, 0, 1, 0, p5.width);
      const sy = p5.map(this.y / this.z, 0, 1, 0, p5.height);

      const r = p5.map(this.z, 0, p5.width, 7, 0);
      p5.circle(sx, sy, r);
    }
  }

  p5.setup = () => {
    p5.createCanvas(400, 400);
    for (let i = 0; i < numStars; i++) {
      stars[i] = new Star();
    }
  };

  p5.draw = () => {
    p5.clear();
    p5.translate(p5.width / 2, p5.height / 2);
    for (let star of stars) {
      star.update();
      star.show();
    }
  };
};

const Space = () => (
  <div id="space">
    <ReactP5Wrapper sketch={Sketch} />
  </div>
);

export default Space;
