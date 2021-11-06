// 更新画布大小
export default function resizeCanvas(canvas) {
  // eslint-disable-next-line no-param-reassign
  canvas.width = canvas.clientWidth;
  // eslint-disable-next-line no-param-reassign
  canvas.height = canvas.clientHeight;
}
