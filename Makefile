ensure:
	yarn install

deploy:
	pulumi up --skip-preview --yes

destroy:
	pulumi destroy -y

logs:
	pulumi logs -f
