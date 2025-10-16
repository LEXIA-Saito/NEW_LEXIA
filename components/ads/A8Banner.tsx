/**
 * A8.net アフィリエイト広告バナー
 * 728×90px レクタングル広告（レスポンシブ対応）
 */
export default function A8Banner() {
  return (
    <div className="my-12 flex justify-center" aria-label="広告">
      <div className="inline-block">
        <a 
          href="https://px.a8.net/svt/ejp?a8mat=45G5XJ+C08PYQ+50+2HOB4X" 
          rel="nofollow noopener noreferrer"
          target="_blank"
          aria-label="スポンサー広告"
        >
          <img 
            width="728" 
            height="90" 
            alt="" 
            src="https://www27.a8.net/svt/bgt?aid=251016967726&wid=001&eno=01&mid=s00000000018015062000&mc=1"
            className="max-w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow"
            loading="lazy"
          />
        </a>
        {/* A8.net トラッキングピクセル */}
        <img 
          width="1" 
          height="1" 
          src="https://www13.a8.net/0.gif?a8mat=45G5XJ+C08PYQ+50+2HOB4X" 
          alt=""
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
