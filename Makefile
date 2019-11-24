JEKYLL_IMAGE = jekyll/minimal:3.5.1

run: install
	docker run --rm -p 4000:4000 --volume="$$PWD:/srv/jekyll" --name="ifmicro-dev" -it ${JEKYLL_IMAGE} jekyll serve --incremental

install:
	docker pull ${JEKYLL_IMAGE}

build: install
	docker run --rm --volume="$$PWD:/srv/jekyll" --name="ifmicro-build" -it ${JEKYLL_IMAGE} jekyll build

publish:
	npm run deploy


