/**
 * 著者データを安全に処理するユーティリティ
 */

function processAuthorData(authorData) {
  try {
    if (!authorData) {
      console.warn('著者データがnullまたはundefinedです');
      return {
        name: '投稿者未設定',
        slug: 'unknown',
        link: '#',
        isValid: false,
      };
    }

    if (typeof authorData === 'object' && authorData !== null) {
      const name = authorData.name || '名前未設定';
      const slug = authorData.slug || name.toLowerCase().replace(/\s+/g, '-');
      return {
        name,
        slug,
        link: `/authors/${slug}`,
        isValid: true,
      };
    }

    if (typeof authorData === 'string' && authorData.trim()) {
      const cleanName = authorData.trim();
      const slug = cleanName.toLowerCase().replace(/\s+/g, '-');
      return {
        name: cleanName,
        slug,
        link: `/authors/${slug}`,
        isValid: true,
      };
    }

    return {
      name: 'データ形式エラー',
      slug: 'error',
      link: '#',
      isValid: false,
    };
  } catch (error) {
    console.error('著者データ処理エラー:', error);
    return {
      name: '処理エラー',
      slug: 'error',
      link: '#',
      isValid: false,
    };
  }
}

module.exports = { processAuthorData };
