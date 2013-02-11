OUTPUTS = ./test/outputs/*
TESTS = `find . | grep _test`

test: clean
	./node_modules/.bin/mocha      \
	  	--recursive            \
		--reporter nyan        \
		$(TESTS)

clean:
	rm -f $(OUTPUTS)

.PHONY: all test clean

