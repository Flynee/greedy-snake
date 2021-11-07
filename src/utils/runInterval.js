// 指定间隔时间执行函数
export default function runInterval(fun, intervalTime) {
  let startTime = Date.now();
  let raf = null;

  function loop() {
    const endTime = Date.now();
    if (endTime - startTime > intervalTime) {
      fun();
      startTime = Date.now();
    }
    raf = requestAnimationFrame(loop);
    return raf;
  }

  return loop();
}
