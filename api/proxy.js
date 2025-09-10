// AI服务代理 - 部署到Vercel
// 文件路径: api/proxy.js

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, serviceUrl } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 默认服务地址，用户可以通过参数覆盖
    const targetUrl = serviceUrl || 'http://localhost:7860';
    
    // 尝试多个API端点
    const endpoints = [
      '/api/chat',
      '/api/v1/chat',
      '/chat',
      '/generate',
      '/api/generate'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${targetUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: message,
            prompt: message,
            input: message,
            text: message
          }),
          timeout: 10000
        });

        if (response.ok) {
          const data = await response.json();
          return res.status(200).json({
            response: data.response || data.message || data.output || data.text || '收到回复',
            endpoint: endpoint
          });
        }
      } catch (error) {
        console.log(`端点 ${endpoint} 失败:`, error.message);
        continue;
      }
    }

    // 如果所有端点都失败
    return res.status(500).json({ 
      error: '无法连接到AI服务',
      message: '请检查AI服务是否正在运行，或尝试使用内网穿透工具'
    });

  } catch (error) {
    console.error('代理错误:', error);
    return res.status(500).json({ 
      error: '代理服务器错误',
      message: error.message 
    });
  }
}
