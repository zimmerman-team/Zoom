.PHONY: build


build:
	docker-compose build

runserver: build
	docker-compose -f docker-compose.dev.yml up