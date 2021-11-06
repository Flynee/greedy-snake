// 获取背景线条数据
export default function getLineData() {
  const points = [];

  for (let i = 40; i <= 960; i += 20) {
    const y = (500 - i) / 500;

    points.push(0.92);
    points.push(y);
    points.push(1.0);

    points.push(-0.92);
    points.push(y);
    points.push(1.0);
  }
  for (let i = 40; i <= 960; i += 20) {
    const x = (500 - i) / 500;

    points.push(x);
    points.push(0.92);
    points.push(1.0);

    points.push(x);
    points.push(-0.92);
    points.push(1.0);
  }
  return points;
}
