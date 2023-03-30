# Try-AWS-Copilot

## メモ（自分用）

### AWS Copilot upgrade@brew

```sh
$ brew upgrade aws/tap/copilot-cli
$ copilot -v
copilot version: v1.27.0
```

### Application

```sh
$ copilot app init try-aws-copilot --domain example.link
$ copilot app show
```

### Environment

```sh
$ copilot env init -a try-aws-copilot -n prod
$ copilot env deploy -a try-aws-copilot -n prod
$ copilot env show
```

```sh
# AWS CDK で Override
$ copilot env override
$ copilot env package -n prod --output-dir ./infrastructure
```

### Service

```sh
$ copilot svc init -a try-aws-copilot -n sample
$ copilot svc deploy -a try-aws-copilot -n sample
$ copilot env show
```
