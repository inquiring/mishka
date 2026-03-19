"use strict";

const fs = require("node:fs");
const path = require("node:path");
const less = require("less");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const csso = require("csso");

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const lessEntry = path.join(rootDir, "less", "style.less");
const buildCssDir = path.join(buildDir, "css");

const rootFiles = ["index.html", "catalog.html", "form.html"];
const assetDirs = ["css", "fonts", "img", "js"];

function removeDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyRecursive(sourcePath, targetPath) {
  fs.cpSync(sourcePath, targetPath, { recursive: true });
}

async function buildStyles() {
  const lessSource = fs.readFileSync(lessEntry, "utf8");
  const lessResult = await less.render(lessSource, {
    filename: lessEntry,
    paths: [path.join(rootDir, "less")]
  });

  const cssPath = path.join(buildCssDir, "style.css");
  fs.writeFileSync(cssPath, lessResult.css);

  const prefixedCss = await postcss([
    autoprefixer({
      overrideBrowserslist: ["last 2 versions"]
    })
  ]).process(fs.readFileSync(cssPath, "utf8"), {
    from: cssPath,
    to: cssPath
  });

  fs.writeFileSync(cssPath, prefixedCss.css);

  const minifiedCss = csso.minify(prefixedCss.css).css;
  fs.writeFileSync(path.join(buildCssDir, "style.min.css"), minifiedCss);
}

async function main() {
  removeDir(buildDir);
  ensureDir(buildDir);

  for (const fileName of rootFiles) {
    copyRecursive(path.join(rootDir, fileName), path.join(buildDir, fileName));
  }

  for (const dirName of assetDirs) {
    const sourceDir = path.join(rootDir, dirName);

    if (fs.existsSync(sourceDir)) {
      copyRecursive(sourceDir, path.join(buildDir, dirName));
    }
  }

  ensureDir(buildCssDir);
  await buildStyles();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
