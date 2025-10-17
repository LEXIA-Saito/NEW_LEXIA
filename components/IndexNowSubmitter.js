import { useState } from 'react';

export default function IndexNowSubmitter({ host }) {
    const [url, setUrl] = useState('');
    const [urls, setUrls] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const submitSingleUrl = async () => {
        if (!url.trim()) {
            setMessage('URLを入力してください');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/indexnow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url.trim(),
                    host: host
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ URLが正常に送信されました');
                setUrl('');
            } else {
                setMessage(`❌ エラー: ${data.error}`);
            }
        } catch (error) {
            setMessage('❌ 送信に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const submitBulkUrls = async () => {
        const urlList = urls.split('\n').filter(u => u.trim());

        if (urlList.length === 0) {
            setMessage('URLを入力してください（1行に1つ）');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/indexnow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    urls: urlList,
                    host: host
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`✅ ${urlList.length}個のURLが正常に送信されました`);
                setUrls('');
            } else {
                setMessage(`❌ エラー: ${data.error}`);
            }
        } catch (error) {
            setMessage('❌ 送信に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">IndexNow URL送信</h2>

            {/* 単一URL送信 */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">単一URL送信</h3>
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/page"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                    <button
                        onClick={submitSingleUrl}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        送信
                    </button>
                </div>
            </div>

            {/* 複数URL送信 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">複数URL送信</h3>
                <textarea
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                    placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
                <button
                    onClick={submitBulkUrls}
                    disabled={loading}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                    一括送信
                </button>
            </div>

            {/* メッセージ表示 */}
            {message && (
                <div className="p-3 rounded-md bg-gray-100 border">
                    {message}
                </div>
            )}

            {/* 使用方法 */}
            <div className="mt-8 p-4 bg-blue-50 rounded-md">
                <h4 className="font-semibold mb-2">使用方法:</h4>
                <ul className="text-sm space-y-1">
                    <li>• 新しいページを公開した時</li>
                    <li>• 既存ページを更新した時</li>
                    <li>• サイトマップを更新した時</li>
                    <li>• 検索エンジンに素早くインデックスしてもらいたい時</li>
                </ul>
            </div>
        </div>
    );
}