import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get('/api/auth/url', (req, res) => {
    const { platform } = req.query;
    const platformId = platform as string;
    
    // Determine redirect URI
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const redirectUri = `${protocol}://${host}/auth/callback`;
    
    // Default to a missing config page if they haven't set keys
    const clientId = process.env[`${platformId.toUpperCase()}_CLIENT_ID`];
    if (!clientId) {
      return res.json({ url: `${protocol}://${host}/missing-keys?platform=${platformId}` });
    }

    const authUrls: Record<string, string> = {
      'tiktok': `https://www.tiktok.com/v2/auth/authorize?client_key=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user.info.basic,video.list&state=simulated_state`,
      'twitter': `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=tweet.read,users.read&state=simulated_state&code_challenge=challenge&code_challenge_method=plain`,
      'instagram': `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user_profile,user_media&state=simulated_state`,
      'linkedin': `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=r_liteprofile,r_emailaddress,w_member_social&state=simulated_state`,
      'youtube': `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly&state=simulated_state`,
    };

    res.json({ url: authUrls[platformId] || 'https://example.com/oauth/authorize' });
  });

  // Missing config handler
  app.get('/missing-keys', (req, res) => {
    res.send(`
      <html>
        <body style="font-family: sans-serif; background: #000; color: #fff; text-align: center; padding: 50px;">
          <h2>API Keys Missing</h2>
          <p>You need to set up the <strong>${req.query.platform?.toString().toUpperCase()}_CLIENT_ID</strong> environment variable in your AI Studio settings to connect a real account.</p>
          <button onclick="window.close()" style="margin-top: 20px; padding: 10px 20px; background: #c026d3; color: white; border: none; border-radius: 5px; cursor: pointer;">Close Window</button>
        </body>
      </html>
    `);
  });

  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    // Return HTML to post message to the opener and close
    res.send(`
      <html>
        <body style="font-family: sans-serif; background: #000; color: #fff; text-align: center; padding-top: 50px;">
          <h2>Authentication Successful</h2>
          <p>Connecting to ViralForge AI...</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              setTimeout(() => window.close(), 1000);
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
