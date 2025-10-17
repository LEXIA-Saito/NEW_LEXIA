import { submitSingleUrl, submitBulkUrls } from '../../lib/indexnow';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, urls, host } = req.body;

  if (!host) {
    return res.status(400).json({ error: 'Host is required' });
  }

  try {
    let success = false;

    if (url) {
      // 単一URL送信
      success = await submitSingleUrl(url, host);
    } else if (urls && Array.isArray(urls)) {
      // 複数URL送信
      success = await submitBulkUrls(urls, host);
    } else {
      return res.status(400).json({ error: 'Either url or urls array is required' });
    }

    if (success) {
      res.status(200).json({ 
        message: 'URLs submitted successfully to IndexNow',
        submitted: url ? [url] : urls
      });
    } else {
      res.status(500).json({ error: 'Failed to submit URLs to IndexNow' });
    }
  } catch (error) {
    console.error('IndexNow API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}