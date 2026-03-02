import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function rawMarkdown(collection: string, id: string) {
	const base = resolve(`src/content/${collection}`);
	let content: string;

	try {
		content = readFileSync(`${base}/${id}.md`, 'utf-8');
	} catch {
		content = readFileSync(`${base}/${id}.mdx`, 'utf-8');
	}

	return new Response(content, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
