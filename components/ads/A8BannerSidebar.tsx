/**
 * A8.net アフィリエイト広告バナー（サイドバー用）
 * 120×90px スクエア広告
 */
export default function A8BannerSidebar() {
  return (
    <div className="flex justify-center" aria-label="広告">
      <div className="inline-block">
        <a
          href="https://px.a8.net/svt/ejp?a8mat=45G5XJ+BZ1UR6+1WP2+6DZBL"
          rel="nofollow noopener noreferrer"
          target="_blank"
          aria-label="スポンサー広告"
        >
          <img
            width="120"
            height="90"
            alt=""
            src="https://www25.a8.net/svt/bgt?aid=251016967724&wid=001&eno=01&mid=s00000008903001073000&mc=1"
            className="max-w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow"
            loading="lazy"
          />
        </a>
        {/* A8.net トラッキングピクセル */}
        <img
          width="1"
          height="1"
          src="https://www12.a8.net/0.gif?a8mat=45G5XJ+BZ1UR6+1WP2+6DZBL"
          alt=""
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
