<template>
    <div class="home">
        <div class="mask" v-show="start" @click="startGame"></div>
        <canvas class="webgl-container" id="div3d"></canvas>
    </div>
</template>

<script>
import { ref } from 'vue';
import {
  runInterval,
  createProgram,
  createShader,
  getLineData,
  getPointData,
  Webgl,
  Snake,
  controlMusic,
} from '@/utils/utils';

export default {
  name: 'Home',
  components: {
  },
  setup() {
    const start = ref(true);

    const runGame = () => {
      const webglInstance = Webgl.getInstance('div3d');
      const { gl } = webglInstance;
      const snake = new Snake();
      const vsh = `
        attribute vec4 a_position;

        void main() {
            gl_Position = a_position;
            gl_PointSize = 15.0;
        }
    `;
      const fsh = `
        precision lowp float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `;
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsh);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsh);
      const program = createProgram(gl, vertexShader, fragmentShader);
      const linePoints = getLineData();
      const points = getPointData();
      console.log(points.length);

      gl.useProgram(program);
      // eslint-disable-next-line camelcase
      const a_position = gl.getAttribLocation(program, 'a_position');
      // eslint-disable-next-line camelcase
      const u_color = gl.getUniformLocation(program, 'u_color');

      // eslint-disable-next-line no-shadow
      function drawBackground(gl, linePoints) {
        const lineData = new Float32Array(linePoints);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, lineData, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0);
        gl.uniform4f(u_color, 24 / 255, 177 / 255, 17 / 255, 1.0);
        gl.drawArrays(gl.LINES, 0, lineData.length / 3);
      }

      // eslint-disable-next-line no-shadow
      function drawPoints(gl, points, result, foodSite) {
        const r = 24 / 255;
        const g = 177 / 255;
        const b = 17 / 255;
        const a = 1.0;

        let paintPoints = points[foodSite];
        result.renderBody.forEach((i) => {
          paintPoints = paintPoints.concat(points[i.site]);
        });

        const pointData = new Float32Array(paintPoints);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0);
        gl.uniform4f(u_color, r, g, b, a);
        gl.drawArrays(gl.POINTS, 0, paintPoints.length / 3);
      }

      let foodSite = Math.floor(Math.random() * 2025);
      function render() {
        webglInstance.reset();
        const result = snake.run(foodSite);
        // eslint-disable-next-line no-unused-expressions
        result.eated && (foodSite = Math.floor(Math.random() * 2025));
        drawBackground(gl, linePoints);
        drawPoints(gl, points, result, foodSite);
      }
      runInterval(render, 200);
    };

    const startGame = () => {
      start.value = false;
      controlMusic.playBg();

      runGame();
    };
    return { start, startGame };
  },
};
</script>
<style lang="scss" scoped>
.home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .webgl-container {
        width: 1000px;
        height: 1000px;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
}
</style>
