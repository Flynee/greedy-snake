export default class Snake {
  constructor() {
    this.DIRECTION_VALUE = {
      UP: -46,
      DOWN: 46,
      RIGHT: 1,
      LEFT: -1,
    };
    this.currentDirection = 'LEFT';
    this.headPoint = {
      direction: 'LEFT',
      site: 1058,
    };
    this.speed = 1;
    this.turnPoints = new Map();
    this.body = [
      {
        direction: 'LEFT',
        site: 1056,
      },
      {
        direction: 'LEFT',
        site: 1057,
      },
      {
        direction: 'LEFT',
        site: 1058,
      },
    ];
    this.timeout = null;
    this.flushed = false;

    this.listen();
  }

  listen() {
    const KEY_MAP = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
    };
    window.addEventListener('keydown', (e) => {
      if (!KEY_MAP[e.code] || !this.flushed) {
        return;
      }
      if (/(UP|DOWN)/g.test(this.currentDirection) && /(UP|DOWN)/g.test(KEY_MAP[e.code])) { // 避免同向或反向移动
        return;
      }
      if (/(LEFT|RIGHT)/g.test(this.currentDirection) && /(LEFT|RIGHT)/g.test(KEY_MAP[e.code])) { // 避免同向或反向移动
        return;
      }

      const direction = KEY_MAP[e.code];
      const turnPoint = this.headPoint;

      this.updateState(direction, turnPoint);
    });
  }

  updateState(direction, turnPoint) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      direction && (this.currentDirection = direction);
      // eslint-disable-next-line no-unused-expressions
      turnPoint && this.turnPoints.set(JSON.stringify(this.headPoint.site), direction);
      this.flushed = false;
    }, 50);
  }

  flushBody(foodSite) {
    const tempBody = [];
    let eated = false;

    this.body.forEach((item, index) => { // 更新身体每个节点方向
      const obj = item;
      const key = JSON.stringify(obj.site);
      if (this.turnPoints.has(key)) {
        obj.direction = this.turnPoints.get(key);

        // 处理尾节点
        if (this.body.length === (index + 1)) {
          this.turnPoints.delete(key);
        }
      }
      tempBody.push(obj);
    });
    this.body = tempBody.map((item) => { // 更新身体位置
      const newItem = item;
      if (/(UP|DOWN)/g.test(item.direction)) { // 上下变动
        newItem.site += this.DIRECTION_VALUE[newItem.direction];
        if (newItem.site < 0) {
          newItem.site += 2116;
        }
        if (newItem.site > 2116) {
          newItem.site -= 2116;
        }
      }
      if (/(LEFT|RIGHT)/g.test(item.direction)) { // 左右变动
        newItem.site += this.DIRECTION_VALUE[newItem.direction];
        if (newItem.site > 2115) {
          newItem.site -= 2116;
        }
        if (newItem.site < 0) {
          newItem.site += 2116;
        }
      }
      if (foodSite === newItem.site) {
        eated = true;
      }
      return newItem;
    });
    if (eated) {
      const lastPoint = this.body.slice(-1)[0];
      const site = lastPoint.site - this.DIRECTION_VALUE[lastPoint.direction];
      const { direction } = lastPoint;
      this.body.push({ direction, site });
    }
    this.flushed = true;
    return { body: this.body, eated };
  }

  run(foodSite) {
    const { body, eated } = this.flushBody(foodSite);
    const { direction, site } = body[0];
    this.headPoint.direction = direction;
    this.headPoint.site = site;

    const result = {
      eated,
      renderBody: [],
    };
    body.forEach((item) => {
      result.renderBody.push(item);
    });

    return result;
  }
}
