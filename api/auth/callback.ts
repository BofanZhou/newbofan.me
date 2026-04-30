import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing code' })
  }
  
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })
    
    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description })
    }
    
    const { access_token } = tokenData
    
    // 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    
    const userData = await userResponse.json()
    
    // 重定向回前端，带上 token
    const rawSiteUrl = process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173')
    const siteUrl = rawSiteUrl.replace(/\/$/, '')
    const redirectUrl = new URL('/admin/editor', siteUrl)
    redirectUrl.searchParams.set('token', access_token)
    redirectUrl.searchParams.set('login', userData.login)
    
    res.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('OAuth error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
