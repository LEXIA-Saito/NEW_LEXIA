/**
 * Google AdSense 設定確認スクリプト
 * 
 * このスクリプトは AdSense の設定が正しく行われているかを確認します
 */

const fs = require('fs');
const path = require('path');

// カラー出力用
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  try {
    const exists = fs.existsSync(filePath);
    if (exists) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`❌ ${description} が見つかりません: ${filePath}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} チェック中にエラー: ${error.message}`, 'red');
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchString)) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`⚠️  ${description} が見つかりません`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} チェック中にエラー: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('\n=== Google AdSense 設定確認 ===\n', 'cyan');

  let allChecks = true;

  // 1. AdSenseLoader コンポーネントの確認
  log('📋 1. AdSense スクリプトローダーの確認', 'blue');
  allChecks = allChecks && checkFile(
    path.join(__dirname, 'components/ads/AdSenseLoader.tsx'),
    'AdSenseLoader コンポーネント'
  );
  allChecks = allChecks && checkFileContent(
    path.join(__dirname, 'components/ads/AdSenseLoader.tsx'),
    'ca-pub-8789901212664644',
    'Publisher ID (ca-pub-8789901212664644)'
  );
  console.log();

  // 2. AdSenseUnit コンポーネントの確認
  log('📋 2. AdSense 広告ユニットコンポーネントの確認', 'blue');
  allChecks = allChecks && checkFile(
    path.join(__dirname, 'components/ads/AdSenseUnit.tsx'),
    'AdSenseUnit コンポーネント'
  );
  allChecks = allChecks && checkFile(
    path.join(__dirname, 'components/ads/AdSenseAds.tsx'),
    'AdSenseAds プリセットコンポーネント'
  );
  console.log();

  // 3. Layout の確認
  log('📋 3. Layout での AdSenseLoader 使用確認', 'blue');
  allChecks = allChecks && checkFileContent(
    path.join(__dirname, 'app/layout.tsx'),
    'AdSenseLoader',
    'app/layout.tsx で AdSenseLoader をインポート'
  );
  allChecks = allChecks && checkFileContent(
    path.join(__dirname, 'app/layout.tsx'),
    '<AdSenseLoader',
    'app/layout.tsx で AdSenseLoader を使用'
  );
  console.log();

  // 4. CSP 設定の確認
  log('📋 4. Content Security Policy (CSP) 設定の確認', 'blue');
  const nextConfigPath = path.join(__dirname, 'next.config.mjs');
  allChecks = allChecks && checkFileContent(
    nextConfigPath,
    'pagead2.googlesyndication.com',
    'CSP: pagead2.googlesyndication.com の許可'
  );
  allChecks = allChecks && checkFileContent(
    nextConfigPath,
    'googleads.g.doubleclick.net',
    'CSP: googleads.g.doubleclick.net の許可'
  );
  allChecks = allChecks && checkFileContent(
    nextConfigPath,
    'adservice.google.com',
    'CSP: adservice.google.com の許可'
  );
  console.log();

  // 5. ads.txt の確認
  log('📋 5. ads.txt ファイルの確認', 'blue');
  const adsTxtPath = path.join(__dirname, 'public/ads.txt');
  allChecks = allChecks && checkFile(adsTxtPath, 'ads.txt ファイル');
  if (fs.existsSync(adsTxtPath)) {
    allChecks = allChecks && checkFileContent(
      adsTxtPath,
      'google.com, pub-8789901212664644',
      'ads.txt に正しい Publisher ID'
    );
  }
  console.log();

  // 6. ドキュメントの確認
  log('📋 6. ドキュメントの確認', 'blue');
  checkFile(
    path.join(__dirname, 'CSP_ADSENSE_FIX.md'),
    'CSP修正ドキュメント'
  );
  checkFile(
    path.join(__dirname, 'ADSENSE_SETUP_GUIDE.md'),
    'AdSense セットアップガイド'
  );
  console.log();

  // 結果サマリー
  log('\n=== 確認結果 ===\n', 'cyan');
  if (allChecks) {
    log('✅ すべての必須設定が完了しています！', 'green');
    log('\n📝 次のステップ:', 'blue');
    log('1. Google AdSense ダッシュボードで広告ユニットを作成', 'reset');
    log('2. 広告スロットID を取得', 'reset');
    log('3. AdSenseDisplayAd / AdSenseInArticleAd コンポーネントで広告を配置', 'reset');
    log('4. 開発環境で testMode={true} で動作確認', 'reset');
    log('5. 本番環境にデプロイして広告表示を確認', 'reset');
    log('\n詳細は ADSENSE_SETUP_GUIDE.md を参照してください。\n', 'cyan');
  } else {
    log('⚠️  いくつかの設定が不足しています。上記のエラーを確認してください。', 'yellow');
  }
}

main();
