# システム開発料金計算表

本ドキュメントでは、システム開発案件の見積もりを自動計算するためのパラメータと計算式をまとめます。`lib/devPricing.js` に実装された `calculateDevPricing` 関数を利用することで、数量と係数を入力するだけで総額を算出できます。

## 基本料金
| 項目 | 金額(円) |
| --- | ---: |
| 要件定義・設計 | 150,000 |
| 基本機能開発 | 300,000 |
| カスタム機能開発 | 200,000 |
| UI/UXデザイン | 100,000 |
| テスト・品質保証 | 80,000 |
| 保守・運用サポート | 60,000 |
| ドキュメント作成 | 40,000 |

## 変動要素
数量に応じて費用が加算されます。

| パラメータ | 単価(円) |
| --- | ---: |
| 画面数 (`screenCount`) | 10,000 |
| 機能数 (`featureCount`) | 50,000 |
| ユーザー数 (`userCount`) | 500 |
| API連携数 (`apiIntegrationCount`) | 30,000 |

さらに、下記係数を乗算して複雑度やセキュリティ要件を考慮します。

- `complexityCoefficient` – 複雑な要件ほど数値を大きくします。
- `securityCoefficient` – セキュリティ強化が必要な場合に調整します。
- `uiComplexityCoefficient` – 特殊なUIを実装する場合に上乗せします。

### 使用例
```ts
import { calculateDevPricing } from '../lib/devPricing';

const params = {
  screenCount: 10,
  featureCount: 5,
  userCount: 100,
  apiIntegrationCount: 3,
  complexityCoefficient: 1.2,
  securityCoefficient: 1.1,
  uiComplexityCoefficient: 1.05,
};

const total = calculateDevPricing(params);
console.log(total); // 計算結果(円)
```
