site-dir = _site
branch-name = source
html-master = html-hub

## 生成网站
site:
	jekyll build --destination ./$(site-dir)
	cd $(site-dir) && rm -i  Makefile && mv -v Makefile.html Makefile

## move html to html branch
move_html:
	cp -Ruv $(site-dir)/* ../$(html-master)

##  push site to github
push:
	git push origin $(branch-name)

## 本地服务  
serve:
	jekyll serve --watch -H 0.0.0.0

clean:
	rm -rIv ./$(site-dir)
