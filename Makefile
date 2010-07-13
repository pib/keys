
TESTS = test/*.test.js

test:
	@./support/expresso/bin/expresso $(TEST_FLAGS) \
		-I lib \
		-I support/nstore/lib \
		-I support/redis/lib \
		$(TESTS)

.PHONY: test