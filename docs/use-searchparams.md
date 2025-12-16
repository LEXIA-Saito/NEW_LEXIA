# useSearchParams の利用メモ

Next.js の `useSearchParams` フックは URL の検索パラメータを非同期で取得する場合があります。
そのため、警告 `useSearchParams() should be wrapped in a suspense boundary` が表示されることがあります。

対策として、`useSearchParams` を利用するコンポーネントは React の `<Suspense>` でラップしてください。

```tsx
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function MyComponent() {
  const searchParams = useSearchParams()
  // ...処理
}

export default function Page() {
  return (
    <Suspense>
      <MyComponent />
    </Suspense>
  )
}
```

これにより、非同期処理として検索パラメータを取得しても、警告なく動作します。
