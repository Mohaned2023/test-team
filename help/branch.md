## Creat Branch
After you clone the repo new you will start working..
1. Go to your fork repo and click `sync`.
2. Pull the repo:
```bash
$ git pull origin main
```
3. Create branch: replace `<bramchName>` with any name. for example `create-about-page`
```
$ git checkout -b <bramchName>
```
4. Start working.
5. Add the files and commits: replace `<message>` with simple documentation for your working
```bash
$ git add .
$ git commit -m "<message>"
```
6. Push the changes to your fork repo:
```bash
$ git push origin <bramchName>
```
7. Back to main branch:
```bash
$ git checkout main
```