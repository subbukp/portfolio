import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

export async function serializeMDX(content: string) {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
}