import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import ejs from 'ejs';

const cwd = process.cwd();

const tplPath = path.resolve(__dirname, '../../../template/index.html');
const args = process.argv.slice(2);
const tpl = fs.readFileSync(tplPath);
const htmlContent = ejs.render(tpl.toString(), { entry: `../${args[0] || 'index.jsx'}` });

const htmlFolder = path.join(cwd, './.wts');
const htmlPath = `${htmlFolder}/index.html`;

fs.ensureDirSync(htmlFolder);
fs.writeFileSync(htmlPath, htmlContent);

const getTempPath = (path: string) => `.wts/${path}`;
spawn(
  'bunx',
  [
    'parcel',
    getTempPath('index.html'),
    '--dist-dir',
    getTempPath('dist'),
    '--cache-dir',
    getTempPath('.cache'),
  ],
  {
    stdio: 'inherit',
    shell: true,
    cwd,
  }
);
