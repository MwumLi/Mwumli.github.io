run:
	jekyll serve --watch -H 0.0.0.0

install:
	npm install
	gem install jekyll -v '3.5.1'

publish:
	npm run deploy


