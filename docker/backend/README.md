# 后端 API 镜像本地构建

这套文件只用于构建和交付 FastapiAdmin 后端 API 服务镜像，不包含 Nginx、PostgreSQL/MySQL、Redis，也不改动原有 `deploy.sh` 部署流程。

## 本地构建

Apple Silicon Mac 给常见 x64 云服务器构建时，默认平台保持 `linux/amd64`：

```bash
./build_api_service.sh --tag latest
```

构建结果默认输出到：

```text
backend/dist/
```

如果想同时把镜像加载到本机 Docker：

```bash
./build_api_service.sh --tag latest --load
```

## 上传服务器

```bash
scp backend/dist/backend_latest_linux_amd64.tar.gz root@服务器IP:/home/
```

## 服务器加载

```bash
cd /home
gunzip -f backend_latest_linux_amd64.tar.gz
docker load -i backend_latest_linux_amd64.tar
```

## 服务器运行示例

推荐在服务器项目根目录使用根目录 Compose 文件。先确认 Docker 环境文件存在：

```bash
cp docker/.env.example docker/.env
```

修改 `docker/.env` 里的数据库、Redis 和端口配置后启动：

```bash
./deploy-backend-api.sh --image-tar /home/backend_latest_linux_amd64.tar.gz --tag latest
```

也可以不用脚本，直接执行根目录 Compose 文件：

```bash
docker compose --env-file docker/.env -f docker/docker-compose.backend-api.yaml up -d
```

生产环境由服务器侧 Compose 启动 Nginx、数据库、Redis 和后端 API。后端镜像只包含 API 服务，上传文件、报告文件和日志通过 volume 持久化到宿主机。


迁移数据库
```
docker exec -it backend python main.py upgrade --env=prod
```
