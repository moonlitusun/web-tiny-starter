import sys
import subprocess
from os import path, getcwd
from pathlib import Path
import shutil
from jinja2 import Template

cwd = getcwd()
args = sys.argv[1:]

current_file = path.abspath(__file__)
tpl_path = path.abspath(
    path.join(current_file, "../../template/jinja2.html")
)

if args and args[0] == 'init':
    init_dst = path.join(cwd, "./index.jsx");
    if not path.exists(init_dst):
        shutil.copy(path.abspath(path.join(current_file, "../../template/index.jsx")), path.join(cwd, "./index.jsx"))
    sys.exit()

with open(tpl_path, "r") as file:
    tpl = Template(file.read())
    entry = f"../{args[0] if args else 'index.jsx'}"
    html_content = tpl.render(entry=entry)

html_folder = path.join(cwd, "./.wts")
html_path = path.join(html_folder, "index.html")

Path(html_folder).mkdir(parents=True, exist_ok=True)

with open(html_path, "w") as file:
    file.write(html_content)


def get_temp_path(filePath):
    return path.join(".wts", filePath)


subprocess.run(
    [
        "bunx",
        "parcel",
        get_temp_path("index.html"),
        "--dist-dir",
        get_temp_path("dist"),
        "--cache-dir",
        get_temp_path(".cache"),
    ],
    cwd=cwd,
)
