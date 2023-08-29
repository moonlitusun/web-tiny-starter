import sys
import subprocess
from os import path, getcwd
from pathlib import Path
from jinja2 import Template

cwd = getcwd()

current_file = path.abspath(__file__)
print(current_file)
tpl_path = path.abspath(
    path.join(current_file, "../../template/jinja2.html")
)
args = sys.argv[1:]

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
