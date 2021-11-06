// 创建渲染器
export default function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const sucess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (sucess) {
    return shader;
  }
  console.error('shader创建失败', shader);
  return null;
}
