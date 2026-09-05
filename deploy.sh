cd ./dist
git init
git add .
git commit -m "deploy"
git remote add origin https://github.com/tcly861204/lumen-ui.git
git branch gh-pages
git checkout gh-pages
git push origin gh-pages -f