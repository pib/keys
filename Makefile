
TESTS = test/*.test.js

test:
	@./support/expresso/bin/expresso $(TEST_FLAGS) \
		-I lib \
		-I support/nstore/lib \
		-I support/riak/lib \
		-I support/redis/lib \
		$(TESTS)

test-cov:
	@$(MAKE) TEST_FLAGS=--cov

.PHONY: test test-cov