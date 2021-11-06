// 指定间隔时间执行函数
export default function runInterval(fun, intervalTime) {
  let startTime = Date.now();

  function loop() {
    const endTime = Date.now();
    if (endTime - startTime > intervalTime) {
      fun();
      startTime = Date.now();
    }
    requestAnimationFrame(loop);
  }
  loop();
}
