rm -r .\dist\
call npm install create-vue
call npm run build
call git subtree push --prefix dist origin gh-pages