const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const htmlPath = path.join(__dirname, '../personal_profile.html');

async function runNodePractice() {
  console.log("==============================================");
  console.log("      网络应用系统开发 —— Node.js 综合实验");
  console.log("==============================================\n");

  try {
    // ==============================================
    // 1. 获取文件详细信息
    // ==============================================
    const stats = await fs.stat(htmlPath);
    console.log("📁 文件信息");
    console.log("路径：", htmlPath);
    console.log("大小：", stats.size, "字节");
    console.log("创建时间：", stats.birthtime.toLocaleString());
    console.log("修改时间：", stats.mtime.toLocaleString());
    console.log("是否为文件：", stats.isFile());
    console.log();

    // ==============================================
    // 2. 读取文件内容
    // ==============================================
    const content = await fs.readFile(htmlPath, 'utf8');
    console.log("✅ HTML 文件读取成功！");
    console.log("内容预览（前400字符）：");
    console.log(content.slice(0, 400) + "...\n");

    // ==============================================
    // 3. 代码行数统计
    // ==============================================
    const lines = content.split("\n").filter(l => l.trim() !== "").length;
    console.log("📝 代码有效行数：", lines);

    // ==============================================
    // 4. 标签统计
    // ==============================================
    const count = (tag) => (content.match(new RegExp(`<${tag}\\b`, 'g')) || []).length;
    console.log("\n🏷️  HTML 标签统计");
    console.log("div 数量：", count("div"));
    console.log("img 数量：", count("img"));
    console.log("button 数量：", count("button"));
    console.log("h1 ~ h6 数量：", count("h") + count("h2") + count("h3"));
    console.log("section 数量：", count("section"));

    // ==============================================
    // 5. 提取页面标题
    // ==============================================
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "未找到标题";
    console.log("\n📄 页面标题：", title);

    // ==============================================
    // 6. 提取所有图片路径
    // ==============================================
    const images = [...content.matchAll(/src="(.*?)"/g)].map(m => m[1]).filter(p => p.endsWith(".jpg") || p.endsWith(".png"));
    console.log("\n🖼️ 页面中包含的图片：");
    images.forEach((img, i) => console.log(` ${i + 1}. ${img}`));

    // ==============================================
    // 7. 检查是否引入 JS
    // ==============================================
    const hasScript = content.includes("script.js");
    console.log("\n⚙️  是否引入 script.js：", hasScript ? "✅ 已引入" : "❌ 未引入");

    // ==============================================
    // 8. 生成完整实验报告
    // ==============================================
    const report = `
==============================================
           Node.js 文件分析实验报告
==============================================
页面标题：${title}
文件大小：${stats.size} 字节
有效行数：${lines}
创建时间：${stats.birthtime.toLocaleString()}

【标签统计】
div：${count("div")}
img：${count("img")}
button：${count("button")}

【页面资源】
图片：${images.join(" | ")}
是否引入JS：${hasScript ? "是" : "否"}

==============================================
`;

    await fs.writeFile(path.join(__dirname, "分析报告.txt"), report, "utf8");
    console.log("\n📄 实验报告已生成：js/分析报告.txt");

  } catch (err) {
    console.error("❌ 出错：", err.message);
  }
}

runNodePractice();