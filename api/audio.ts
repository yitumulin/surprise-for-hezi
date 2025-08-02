import type { VercelRequest, VercelResponse } from '@vercel/node';

const R2_BASE = 'https://audio.yitumulin.com'; // Cloudflare R2 自定义域名

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const file = (req.query.file as string) || '';
    if (!file) return res.status(400).send('Missing ?file=');

    const r2Url = `${R2_BASE}/${encodeURI(file)}`;

    // 透传 Range，支持进度条拖动
    const headers: Record<string, string> = {};
    const range = req.headers['range'];
    if (range) headers['Range'] = String(range);

    const r2Resp = await fetch(r2Url, { headers });

    // CORS 允许跨域（页面可能在 yitumulin.com 下）
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 透传常见音频相关响应头
    res.status(r2Resp.status);
    r2Resp.headers.forEach((v, k) => {
      const kk = k.toLowerCase();
      if (['content-type','content-length','accept-ranges','content-range','etag','last-modified','cache-control'].includes(kk)) {
        res.setHeader(k, v);
      }
    });

    if (!r2Resp.body) return res.end();

    const reader = r2Resp.body.getReader();
    const pump = async () => {
      const { value, done } = await reader.read();
      if (done) return res.end();
      res.write(Buffer.from(value));
      pump();
    };
    pump();
  } catch (e) {
    res.status(502).send('Proxy error');
  }
} 