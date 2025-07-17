export default function Head() {
  const description =
    "LEXIA代表・齋藤雅人｜WEB制作業界歴5年、愛知県碧南市のWEBディレクター。ホームページ制作からシステム開発、AI活用、PC教室まで一貫対応。地元視点×技術力で愛知の企業のデジタル化を直接サポート";
  const title = "齋藤雅人 | LEXIA代表・WEBディレクター";
  const url = "https://lexia-hp.com/team/masato-saito";
  const image = "https://lexia-hp.com/og/og_ceo.jpg";
  return (
    <>
      <meta name="description" content={description} />
      {/* OGP tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content="LEXIA" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
