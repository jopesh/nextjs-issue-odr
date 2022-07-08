import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { createClient, groq } from "next-sanity"
import { PortableText } from "@portabletext/react"
import createImageUrlBuilder from "@sanity/image-url"
import Image from "next/image"

const config = {
  projectId: "sqm24dlz",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-03-25",
}

const client = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.fetch(groq`
    *[_type == "post"].slug.current
  `)
  const paths = data.map((slug) => ({
    params: {
      slug,
    },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await client.fetch(
    groq`
    *[_type == "post" && slug.current == $slug][0]
  `,
    { slug: params?.slug }
  )
  const time = new Date().toLocaleTimeString()
  console.log(`Data from ${time}`, data)
  return {
    props: {
      data,
    },
  }
}

type Post = {
  data: {
    title: string
    slug: {
      current: string
    }
    image: any
    body: any[]
  }
}

const PostPage: NextPage<Post> = ({ data }) => {
  return (
    <article>
      <h1>{data.title}</h1>
      <div>
        {data.image && (
          <Image
            src={urlFor(data.image).url()}
            height={500}
            width={1000}
            alt=""
          />
        )}
      </div>
      <PortableText value={data.body} />
    </article>
  )
}

export default PostPage
