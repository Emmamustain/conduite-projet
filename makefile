# Linux Makefile

.PHONY: all check-node install dev open-browser

# Default target
all: check-node install dev

# Check if Node.js is installed
check-node:
	@if ! command -v node > /dev/null; then \
		echo "Node.js is not installed. Opening download page..."; \
		xdg-open https://nodejs.org/en/download/ || open https://nodejs.org/en/download/; \
		exit 1; \
	else \
		echo "Node.js is installed: $$(node --version)"; \
	fi

# Install dependencies
install:
	pnpm install

# Start development server
dev:
	pnpm dev & \
	sleep 5 && \
	(xdg-open http://localhost:3000 || open http://localhost:3000)

# Open browser separately if needed
open-browser:
	xdg-open http://localhost:3000 || open http://localhost:3000