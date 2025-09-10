# CORS修复示例代码

## Flask应用添加CORS支持
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有域名访问

# 或者更精确的配置
CORS(app, origins=["https://yitumulin.com", "http://localhost:8000"])
```

## FastAPI应用添加CORS支持
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yitumulin.com", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 手动添加CORS头（通用方法）
```python
from flask import Flask, jsonify, request
from flask_cors import cross_origin

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
```

## Gradio应用添加CORS支持
```python
import gradio as gr

# 启动时添加CORS参数
demo.launch(
    server_name="0.0.0.0",
    server_port=7860,
    share=False,
    cors_allow_origins=["https://yitumulin.com"]
)
```
