import IndexNowSubmitter from '../components/IndexNowSubmitter';

export default function IndexNowAdmin() {
  // ここに実際のドメイン名を設定してください
  const HOST = 'lexia-hp.com';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <IndexNowSubmitter host={HOST} />
      </div>
    </div>
  );
}