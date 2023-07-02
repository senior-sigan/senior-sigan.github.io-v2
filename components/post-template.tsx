import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

type PostProps = {
  slug: string;
  source: MDXRemoteSerializeResult;
}

export default function PostTemplate(props: PostProps) {
  return <>
    <h1>{props.slug}</h1>
    <main>
      <MDXRemote {...props.source} />
    </main>
  </>;
}