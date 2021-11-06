import resizeCanvas from './resizeCanvas';

export default class Webgl {
  constructor(id) {
    this.instance = null;
    this.canvas = document.querySelector(`#${id}`);
    resizeCanvas(this.canvas);
    this.gl = this.canvas.getContext('webgl');
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  static getInstance(id) {
    if (!this.instance) {
      this.instance = new Webgl(id);
    }
    return this.instance;
  }

  reset() {
    resizeCanvas(this.canvas);
    this.gl = this.canvas.getContext('webgl');
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}
