import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { rawMarkdown } from '../../lib/raw';

export async function getStaticPaths() {
	const all = await getCollection('blog');
	const posts = import.meta.env.PROD ? all.filter((p) => !p.data.draft) : all;
	return posts.map((post) => ({
		params: { slug: post.id },
		props: post,
	}));
}

type Props = CollectionEntry<'blog'>;

export function GET({ props }: { props: Props }) {
	return rawMarkdown('blog', props.id);
}
