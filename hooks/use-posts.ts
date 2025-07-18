import { useState, useEffect } from "react"

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
  }, [])

  return posts
}
