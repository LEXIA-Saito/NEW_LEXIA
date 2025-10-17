const INDEXNOW_KEY = 'b770a8e3e60e4020bf2ca1649b7d57c2';
const INDEXNOW_API_URL = 'https://api.indexnow.org/indexnow';

/**
 * IndexNowに単一のURLを送信
 * @param {string} url - 送信するURL
 * @param {string} host - ホスト名（例: www.example.com）
 * @returns {Promise<boolean>} - 成功した場合true
 */
export async function submitSingleUrl(url, host) {
  try {
    const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
    
    const response = await fetch(`${INDEXNOW_API_URL}?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}&keyLocation=${encodeURIComponent(keyLocation)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'IndexNow-Client'
      }
    });

    return response.ok;
  } catch (error) {
    console.error('IndexNow single URL submission failed:', error);
    return false;
  }
}

/**
 * IndexNowに複数のURLを一括送信
 * @param {string[]} urls - 送信するURLの配列
 * @param {string} host - ホスト名（例: www.example.com）
 * @returns {Promise<boolean>} - 成功した場合true
 */
export async function submitBulkUrls(urls, host) {
  try {
    const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
    
    const payload = {
      host: host,
      key: INDEXNOW_KEY,
      keyLocation: keyLocation,
      urlList: urls
    };

    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'IndexNow-Client'
      },
      body: JSON.stringify(payload)
    });

    return response.ok;
  } catch (error) {
    console.error('IndexNow bulk URL submission failed:', error);
    return false;
  }
}

/**
 * レスポンスコードの説明を取得
 * @param {number} statusCode - HTTPステータスコード
 * @returns {string} - ステータスの説明
 */
export function getStatusDescription(statusCode) {
  const statusMap = {
    200: 'URL submitted successfully',
    400: 'Bad request - Invalid format',
    403: 'Forbidden - Key not valid (key not found or file found but key not in file)',
    422: 'Unprocessable Entity - URLs don\'t belong to the host or key doesn\'t match schema',
    429: 'Too Many Requests - Potential spam detected'
  };
  
  return statusMap[statusCode] || 'Unknown status code';
}