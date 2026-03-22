// 1. 闭包计数器
function createCounter() {
  let count = 0; // 私有变量
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log('计数器测试：');
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 尝试从外部修改 count（无法直接访问，证明私有化）
console.log('尝试访问 counter.count：', counter.count); // undefined

// 2. 数据缓存闭包（两数求和）
function createSumCache() {
  const cache = {};
  return function (a, b) {
    const key = `${a},${b}`;
    if (cache.hasOwnProperty(key)) {
      console.log(`缓存命中：${key} = ${cache[key]}`);
      return cache[key];
    } else {
      const sum = a + b;
      cache[key] = sum;
      console.log(`首次计算：${key} = ${sum}，已缓存`);
      return sum;
    }
  };
}

const sumCache = createSumCache();
console.log('求和缓存测试：');
console.log('2 + 3 =', sumCache(2, 3)); // 首次
console.log('2 + 3 =', sumCache(2, 3)); // 缓存
console.log('4 + 5 =', sumCache(4, 5)); // 首次
console.log('4 + 5 =', sumCache(4, 5)); // 缓存

// 3. 对比浏览器与Node.js运行差异（控制台输出）
console.log('\n=== 运行环境对比 ===');
console.log('Node.js环境中，闭包原理与浏览器一致，但无DOM API。');
console.log('本脚本仅用于验证闭包逻辑，可在命令行执行：node closureDemo.js');