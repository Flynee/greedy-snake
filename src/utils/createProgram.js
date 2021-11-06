// 创建渲染程序
export default function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const sucess = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (sucess) {
    return program;
  }
  return null;
}
