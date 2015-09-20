book-name = micro_cmd		#书名和分支名
commit-m = "update book cmd"
## 本地安装 book.json 中配置的插件
plugin:  
	gitbook install

## 生成网站
site:
	gitbook build . book-$(book-name)

## push html to github
push_html:
	cp -Rv book-$(book-name)/* ../html-hub/book-$(book-name)/ && cd ../html-hub && git add book-$(book-name)/* && git commit -m $(commit-m) && git push origin master

##  push book to github
push_book:
	git push origin $(book-name)

## 本地服务  
serve:
	gitbook serve

## 初始化书籍结构
init:
	gitbook init

## 清除历史数据
clean:
	rm -rIv ./book-$(book-name)/
	rm -rIv ./_book/

