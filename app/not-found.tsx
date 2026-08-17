"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./not-found.module.css"

/** 5x7 ドットマトリクス字形 */
const GLYPH_4 = ["00010", "00110", "01010", "10010", "11111", "00010", "00010"]
const GLYPH_0 = ["01110", "10001", "10011", "10101", "11001", "10001", "01110"]

/** "4 0 4" を 19 列 x 7 行の 1 枚のマトリクスに合成する（字間 2 ドット） */
const MATRIX_ROWS = GLYPH_4.map(
  (row, y) => `${row}00${GLYPH_0[y]}00${GLYPH_4[y]}`,
)

/**
 * 描画用のセル一覧。
 * col は左から順に点灯させるための遅延係数、seed はちらつきをばらけさせる係数。
 */
const MATRIX_CELLS = MATRIX_ROWS.flatMap((row, y) =>
  row.split("").map((bit, x) => ({
    id: `${x}-${y}`,
    lit: bit === "1",
    col: x,
    seed: (x * 7 + y * 13) % 9,
  })),
)

export default function NotFound() {
  const pathname = usePathname()
  // 長すぎるパスはログ行が破綻するので丸める
  const target = (pathname ?? "/").slice(0, 48)

  const logLines: { text: string; className?: string }[] = [
    { text: `$ lexia --trace ${target}`, className: styles.path },
    { text: "> resolving route ................ 3 hops" },
    { text: "> checking sitemap ............... no match" },
    { text: "! ERR_ROUTE_NOT_FOUND   [status 404]", className: styles.err },
    { text: "> お探しのページは存在しないか、移動しました。" },
    { text: "> 復旧経路を出力します", className: styles.ok },
  ]

  return (
    <main className={styles.screen}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.rain} aria-hidden="true" />
      <div className={styles.fade} aria-hidden="true" />
      <div
        className={`${styles.sweep} ${styles.overlay}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.scanlines} ${styles.overlay}`}
        aria-hidden="true"
      />

      <section className={styles.console}>
        <div className={styles.bar}>
          <span className={styles.leds} aria-hidden="true">
            <span className={styles.led} />
            <span className={styles.led} />
            <span className={styles.led} />
          </span>
          <span className={styles.barTitle}>root@lexia-hp:~$</span>
          <span className={styles.status}>404</span>
        </div>

        <div className={styles.body}>
          <h1 className={styles.h1}>
            <span className={styles.srOnly}>404 ページが見つかりません</span>
            <span className={styles.matrixWrap} aria-hidden="true">
              <span className={styles.matrix}>
                {MATRIX_CELLS.map((cell) => (
                  <span
                    key={cell.id}
                    className={
                      cell.lit ? `${styles.cell} ${styles.on}` : styles.cell
                    }
                    style={
                      {
                        "--x": cell.col,
                        "--r": cell.seed,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </span>
            </span>
          </h1>

          <p className={styles.heading} data-text="PAGE NOT FOUND">
            PAGE NOT FOUND
          </p>

          <div className={styles.rule} aria-hidden="true" />

          <div className={styles.log}>
            {logLines.map((line, i) => (
              <p
                key={line.text}
                className={`${styles.line} ${line.className ?? ""}`}
                style={{
                  animationTimingFunction: `steps(${Math.max(
                    line.text.length,
                    1,
                  )})`,
                  animationDelay: `${0.45 + i * 0.4}s`,
                }}
              >
                {line.text}
                {i === logLines.length - 1 && (
                  <span className={styles.cursor} aria-hidden="true" />
                )}
              </p>
            ))}
          </div>

          <nav className={styles.actions}>
            <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
              トップへ戻る
            </Link>
            <Link href="/services" className={styles.btn}>
              サービス
            </Link>
            <Link href="/blog" className={styles.btn}>
              ブログ
            </Link>
            <Link href="/contact" className={styles.btn}>
              お問い合わせ
            </Link>
          </nav>

          <p className={styles.note}>
            ※ この画面は 404
            エラーページの演出です。サイトは正常に稼働しています。
          </p>
        </div>
      </section>
    </main>
  )
}
