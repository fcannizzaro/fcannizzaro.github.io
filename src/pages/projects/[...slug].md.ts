import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { rawMarkdown } from '../../lib/raw';
import { entrySlug } from '../../lib/utils';

export async function getStaticPaths() {
	const projects = await getCollection('projects');
	return projects.map((project) => ({
		params: { slug: entrySlug(project.id) },
		props: project,
	}));
}

type Props = CollectionEntry<'projects'>;

export function GET({ props }: { props: Props }) {
	return rawMarkdown('projects', entrySlug(props.id));
}
