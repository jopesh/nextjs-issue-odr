import Link from "next/link"

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return (
    <div>
      <Link href="/blog/test">
        <a>Go to test post</a>
      </Link>
    </div>
  )
}
