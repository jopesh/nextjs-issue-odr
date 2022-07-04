import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Revalidating /blog/test")
    await res.revalidate("/blog/test")
    console.log("Successfully revalidated /blog/test")
    return res.status(200).json({ message: "ok" })
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
}
