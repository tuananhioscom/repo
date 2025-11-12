import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory (but not index.html - we'll SSR that)
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath, {
  maxAge: '1y',
  index: false  // Don't serve index.html automatically - we handle it in SSR route
}));

// Server-side rendering for all routes
app.get('*', (req, res) => {
  try {
    console.log(`[SSR] Rendering: ${req.url}`);

    // Render the React app to HTML string
    const appHtml = renderToString(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Read the base HTML template from dist
    const indexPath = path.join(distPath, 'index.html');

    if (!fs.existsSync(indexPath)) {
      throw new Error(`index.html not found at ${indexPath}. Please run 'npm run build:client' first.`);
    }

    let html = fs.readFileSync(indexPath, 'utf-8');

    // Replace the root div content with server-rendered HTML
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Send the complete HTML with proper headers
    res.status(200).set({
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600'
    }).send(html);

  } catch (error) {
    console.error('❌ SSR Error:', error);
    res.status(500).send(`
      <h1>500 - Server Error</h1>
      <p>An error occurred during server-side rendering.</p>
      <pre>${error.message}</pre>
      <p>Make sure you've built the client first: <code>npm run build:client</code></p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🚀 SSR Server Started Successfully!      ║
║                                            ║
║  📍 URL: http://localhost:${PORT}         ║
║  📂 Serving from: ${distPath}  ║
║  ⚡ Mode: Server-Side Rendering           ║
╚════════════════════════════════════════════╝
  `);
});
