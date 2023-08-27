import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import crypto from 'crypto';
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
const entry = `${cwd}/${args[0]}`;
const htmlContent = ejs.render(tpl.toString(), { entry: `./${args[0]}` });

const htmlFolder = `/tmp/web-tiny-starter/${generateHash(entry)}`;
const htmlPath = `${htmlFolder}/index.html`;

// if (!fs.existsSync(htmlPath)) {
fs.ensureDirSync(htmlFolder);
fs.writeFileSync(htmlPath, htmlContent);
// }

console.log(htmlPath, '<-- htmlPath');
spawn('cd', [htmlFolder], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

spawn('ln', ['-s', `${cwd}/${args[0]}`, `${htmlFolder}/${args[0]}`], {
  stdio: 'inherit',
  shell: true,
});

spawn('bunx', ['parcel', 'index.html'], {
  stdio: 'inherit',
  shell: true,
  cwd: htmlFolder,
});
