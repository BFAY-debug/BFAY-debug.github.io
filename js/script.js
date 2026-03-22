window.onload = function () {
  avatarChange();
  moduleToggle();
  editName();
  skillTip();
  hobbySelect();
  closureCounter();
  cacheSumDemo();
};

// 1. 头像点击切换
function avatarChange() {
  let img = document.getElementById("avatarImg");
  let list = [
    "images/avatar0.jpg",
    "images/avatar1.jpg",
    "images/avatar2.jpg"
  ];
  let index = 0;
  img.onclick = () => {
    index = (index + 1) % 3;
    img.src = list[index];
  };
}

// 2. 模块折叠/展开
function moduleToggle() {
  let titles = document.querySelectorAll("section h2");
  titles.forEach(title => {
    title.onclick = () => {
      let content = title.nextElementSibling;
      content.style.display = content.style.display === "none" ? "block" : "none";
    };
  });
}

// 3. 编辑姓名
function editName() {
  let name = document.getElementById("userName");
  let edit = document.getElementById("editNameBtn");
  let ok = document.getElementById("confirmNameBtn");
  let oldName = name.innerText;

  edit.onclick = () => {
    let input = document.createElement("input");
    input.value = oldName;
    input.style.padding = "6px";
    input.style.fontSize = "18px";
    name.innerHTML = "";
    name.appendChild(input);
    edit.style.display = "none";
    ok.style.display = "inline-block";
  };

  ok.onclick = () => {
    let input = name.querySelector("input");
    name.innerText = input.value.trim() || oldName;
    oldName = name.innerText;
    edit.style.display = "inline-block";
    ok.style.display = "none";
  };
}

// 4. 技能悬浮提示
function skillTip() {
  const tip = document.createElement("div");
  tip.style.cssText = `
        position: fixed;
        background: #2c3e50;
        color: #fff;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        pointer-events: none;
        display: none;
        z-index: 9999;
        max-width: 280px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;
  document.body.appendChild(tip);

  const items = document.querySelectorAll(".skill-item");
  items.forEach(item => {
    item.onmouseenter = function () {
      tip.innerText = this.dataset.desc;
      tip.style.display = "block";
    };
    item.onmousemove = function (e) {
      tip.style.left = e.clientX + 15 + "px";
      tip.style.top = e.clientY + 15 + "px";
    };
    item.onmouseleave = function () {
      tip.style.display = "none";
    };
  });
}

// 5. 兴趣标签选中效果
function hobbySelect() {
  let tags = document.querySelectorAll(".hobby-tag");
  tags.forEach(tag => {
    tag.onclick = function () {
      this.classList.toggle("selected");
    };
  });
}

// 6. 闭包计数器
function closureCounter() {
  function createCounter() {
    let count = 0;
    return function () {
      count++;
      return count;
    };
  }
  let counter = createCounter();
  let btn = document.getElementById("countBtn");
  let show = document.getElementById("countShow");
  btn.onclick = function () {
    show.innerText = counter();
  };
}

// 7. 缓存闭包计算器（两数求和 + 缓存演示）
function cacheSumDemo() {
  const numA = document.getElementById('numA');
  const numB = document.getElementById('numB');
  const calcBtn = document.getElementById('calcSumBtn');
  const clearBtn = document.getElementById('clearCacheBtn');
  const resultDiv = document.getElementById('cacheSumResult');
  const statusSpan = document.getElementById('cacheHitInfo');

  if (!numA || !numB || !calcBtn || !clearBtn || !resultDiv || !statusSpan) {
    console.error('缓存计算器缺少必要元素，请检查 HTML 中的 ID');
    return;
  }

  // 闭包缓存
  function createSumCache() {
    const cache = {};
    return {
      compute(a, b) {
        const key = `${a},${b}`;
        if (cache.hasOwnProperty(key)) {
          return { value: cache[key], hit: true };
        }
        const sum = a + b;
        cache[key] = sum;
        return { value: sum, hit: false };
      },
      clear() {
        for (let k in cache) delete cache[k];
      }
    };
  }

  const sumCache = createSumCache();

  function updateUI(value, hit) {
    resultDiv.innerText = value;
    if (hit) {
      statusSpan.innerHTML = '✅ 缓存命中！直接返回结果';
      statusSpan.style.background = '#27ae60';
    } else {
      statusSpan.innerHTML = '✨ 首次计算，已存入缓存';
      statusSpan.style.background = '#e67e22';
    }
    statusSpan.style.color = 'white';
    setTimeout(() => {
      statusSpan.style.background = '#2c3e50';
      statusSpan.style.color = '#f1c40f';
      statusSpan.innerHTML = '⚡ 等待计算';
    }, 3000);
  }

  calcBtn.onclick = () => {
    let a = parseFloat(numA.value);
    let b = parseFloat(numB.value);
    if (isNaN(a)) a = 0;
    if (isNaN(b)) b = 0;
    const { value, hit } = sumCache.compute(a, b);
    updateUI(value, hit);
  };

  clearBtn.onclick = () => {
    sumCache.clear();
    statusSpan.innerHTML = '🗑️ 缓存已清空，下次计算将重新存储';
    statusSpan.style.background = '#e67e22';
    statusSpan.style.color = 'white';
    setTimeout(() => {
      statusSpan.style.background = '#2c3e50';
      statusSpan.style.color = '#f1c40f';
      statusSpan.innerHTML = '⚡ 等待计算';
    }, 3000);
  };

  // 初始化计算默认值
  const initA = parseFloat(numA.value) || 0;
  const initB = parseFloat(numB.value) || 0;
  const { value: initVal, hit: initHit } = sumCache.compute(initA, initB);
  updateUI(initVal, initHit);
}