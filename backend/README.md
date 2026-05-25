# 学生信息管理系统 - 后端

## 项目结构

```
server/
├── app/
│   ├── api/           # API路由
│   │   ├── auth.py    # 认证相关
│   │   └── student.py # 学生管理
│   ├── core/          # 核心配置
│   │   ├── config.py  # 应用配置
│   │   ├── database.py # 数据库连接
│   │   ├── deps.py     # 依赖注入
│   │   └── security.py # 安全工具
│   ├── crud/          # CRUD操作
│   │   ├── student_crud.py
│   │   └── user_crud.py
│   ├── models/        # 数据库模型
│   │   └── models.py
│   ├── schemas/       # Pydantic模型
│   │   └── schemas.py
│   └── main.py        # 应用入口
├── init_db.py         # 数据库初始化
├── pyproject.toml     # 项目与依赖（uv）
├── uv.lock            # 锁定版本
└── .env               # 环境变量
```

## 快速开始

前置：[安装 uv](https://docs.astral.sh/uv/getting-started/installation/)

### 1. 安装依赖

```bash
cd backend
uv sync
```

### 2. 配置数据库

创建MySQL数据库：
```sql
CREATE DATABASE gi_admin DEFAULT CHARACTER SET utf8mb4;
```

修改 `.env` 中的数据库连接信息。

### 3. 初始化数据库

```bash
uv run python init_db.py
```

这会创建表并添加默认用户：
- 超级管理员：`admin / 123456`
- 普通用户：`user / 123456`

### 4. 启动服务

```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

也可使用 `./run_linux.sh`（macOS/Linux）或 `run_win.bat`（Windows）交互菜单。

服务地址：http://localhost:8000

## API列表

### 认证

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/auth/login | 登录 |
| GET | /api/auth/userinfo | 获取用户信息 |
| POST | /api/auth/logout | 退出 |
| POST | /api/auth/register | 注册 |

### 学生管理（需认证）

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | /api/student/list | 列表（分页） | 所有用户 |
| GET | /api/student/{id} | 详情 | 所有用户 |
| POST | /api/student | 新增 | 仅管理员 |
| PUT | /api/student/{id} | 编辑 | 仅管理员 |
| DELETE | /api/student/{id} | 删除 | 仅管理员 |

## 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 前端对接

前端代理已配置将 `/api` 请求转发到 `http://localhost:8000`。

启动后端后，前端可直接访问API。