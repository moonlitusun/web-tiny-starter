import subprocess

command = "bunx parcel ../template/index.html"

process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, text=True)

while True:
    output = process.stdout.readline().decode().strip()
    if output == '' and process.poll() is not None:
        break
    if output:
        print(output)

returncode = process.wait()

if returncode == 0:
    print('ok')
    # print(stdout)
else:
    print('error')
    # print(stderr)
