# 🚀 AI对话快速启动指南

## 问题说明
您的AI服务运行在本地 `localhost:7860`，但网页部署在 `yitumulin.com`，存在跨域访问限制。

## 解决方案：使用ngrok（推荐）

### 步骤1：下载ngrok
1. 访问：https://ngrok.com/
2. 注册免费账户
3. 下载ngrok客户端

### 步骤2：启动ngrok
```bash
# 确保您的AI服务正在运行在7860端口
# 然后运行：
ngrok http 7860
```

### 步骤3：获取公网地址
ngrok会显示类似这样的信息：
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:7860
```

**复制 `https://abc123.ngrok.io` 这个地址**

### 步骤4：配置AI对话页面
1. 访问：https://yitumulin.com/ai-dialog.html
2. 在"AI服务地址"输入框中粘贴ngrok地址
3. 点击"更新地址"
4. 开始对话！

## 注意事项
- 免费版ngrok地址每次重启都会变化
- 每次重启ngrok后需要重新配置地址
- 付费版可以固定域名

## 其他解决方案

### 方案2：修改AI服务添加CORS
如果您使用Python Flask/FastAPI：
```python
from flask_cors import CORS
CORS(app, origins=["https://yitumulin.com"])
```

### 方案3：使用其他内网穿透工具
- frp
- natapp
- cpolar

## 测试连接
配置完成后，发送一条测试消息，如果AI回复了，说明连接成功！
