// 获取画布所有方格点位
export default function getPointData() {
  const points = [];
  for (let i = 50; i <= 950; i += 20) {
    const y = (500 - i) / 500;

    for (let k = 50; k <= 950; k += 20) {
      const x = (k - 500) / 500;

      points.push([x, y, 1.0]);
    }
  }
  return points;
}
