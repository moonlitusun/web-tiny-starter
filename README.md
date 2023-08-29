## Motivation

Recently, I've been learning about the new Hooks in React, such as useTransition. When taking notes, I wanted to include code snippets without the need for a complex setup and a lot of boilerplate code, which can be cumbersome and take up disk space and overall note space (especially with node_modules, even though there's pnpm). So, I thought of using the zero-configuration and JSX support features of parcel to create a small tool. The goal was to have a simple setup where only an index.jsx/tsx file is required to run the code.

## Implementation

Initially, I started with a version using node, but then I thought it would be better to use Python. Therefore, I will maintain the Python version in the long term.

At first, I envisioned the following behavior: executing a _wts command in the directory of index.jsx would generate a project in the /tmp/hash(cwd hash) directory. The index.html file would be placed there, referencing the index.jsx file using the absolute path of cwd. However, the main issue was that parcel does not support absolute paths for resources.

Then, I thought about moving the contents of cwd to /tmp. Initially, I used the ln command, which copied the files and allowed the project to run. However, the hot-reloading feature stopped working because node's watch cannot monitor symbolic links.

I then changed the approach to watch the cwd directory myself and synchronize any changes to /tmp. This approach was feasible, but I couldn't be sure if the user had large files or was performing many add/delete operations in cwd. All these changes would need to be synchronized, so this idea was also abandoned.

Finally, I compromised by creating a .wts directory inside cwd. I placed the index.html file and the build artifacts from parcel inside that directory. I added .wts to .gitignore, so apart from the additional directory during execution, all the desired effects were achieved.

## Usage

```bash
# init
wts init

# run
wts index.jsx
```
