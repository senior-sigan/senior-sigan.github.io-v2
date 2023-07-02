import { serialize } from "next-mdx-remote/serialize";
import PostTemplate from "../components/post-template";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import {read} from 'to-vfile';
import {matter} from 'vfile-matter';
import fs from "fs/promises";
import path from "path";

type Props = {
  slug: string;
  source: MDXRemoteSerializeResult;
};

export default function PostPage(props: Props) {
  return <PostTemplate {...props} />
}

const POSTS_PATH = path.join(process.cwd(), "posts");

export async function getStaticPaths () {
  const paths = (await fs.readdir(POSTS_PATH)).filter(path => /\.mdx?$/.test(path));

  const slugs = paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths: slugs,
    fallback: false,
  }
}

export async function getStaticProps (
  {params}: {params:{slug: string}}
) {
  // TODO: read file from the posts/[slug], extract content...

  const file = await read(`posts/${params.slug}.mdx`)
  matter(file, {strip: true});
  console.log(file.data);

  const mdxSource = await serialize(String(file));

  return {
    props: {
      slug: params.slug,
      source: mdxSource,
    }
  }
}