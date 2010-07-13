
test:
	@./support/expresso/bin/expresso \
		-I lib \
		-I support/nstore/lib \
		-I support/redis/lib \
		test/*.test.js

.PHONY: test