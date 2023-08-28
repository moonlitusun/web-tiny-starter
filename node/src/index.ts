import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import crypto from 'crypto';
import chokidar from 'chokidar';
import ejs from 'ejs';

const cwd = process.cwd();

const generateHash = (str: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(str);

  const hashValue = hash.digest('hex');
  return hashValue;
};

// console.log(cwd, '<-- cwd');
const tplPath = path.resolve(__dirname, '../../../template/index.html');
const args = process.argv.slice(2);
const tpl = fs.readFileSync(tplPath);
// const entry = `${cwd}/${args[0]}`;
const htmlContent = ejs.render(tpl.toString(), { entry: './index.jsx' });

// const htmlFolder = path.join(cwd, './wts');
const htmlPath = `${cwd}/wts-index.html`;

console.log(path.relative(cwd, htmlPath), '<-- 3243')

// if (!fs.existsSync(htmlPath)) {
// fs.ensureDirSync(htmlFolder);
fs.writeFileSync(htmlPath, htmlContent);
// }

// console.log(htmlPath, '<-- htmlPath');
// spawn('cd', [htmlFolder], {
//   stdio: 'inherit',
//   shell: true,
//   cwd: process.cwd(),
// });

spawn('bunx', ['parcel', 'wts-index.html'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});
