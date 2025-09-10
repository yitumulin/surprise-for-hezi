# 使用ngrok解决CORS问题

## 步骤1：下载并安装ngrok
1. 访问 https://ngrok.com/
2. 注册免费账户
3. 下载ngrok客户端

## 步骤2：启动ngrok
```bash
# 在命令行中运行（确保AI服务在7860端口运行）
ngrok http 7860
```

## 步骤3：获取公网地址
ngrok会显示类似这样的地址：
```
Forwarding    https://abc123.ngrok.io -> http://localhost:7860
```

## 步骤4：在AI对话页面中配置
1. 访问 https://yitumulin.com/ai-dialog.html
2. 在"AI服务地址"输入框中输入：`https://abc123.ngrok.io`
3. 点击"更新地址"
4. 开始对话！

## 注意事项
- 免费版ngrok地址每次重启都会变化
- 付费版可以固定域名
- 确保AI服务支持HTTPS（如果需要）
