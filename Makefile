test:
	./node_modules/.bin/mocha \
	  	--recursive \
		-R nyan

.PHONY: all test clean
