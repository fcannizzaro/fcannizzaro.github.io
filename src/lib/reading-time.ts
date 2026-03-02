const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number {
	const text = content
		.replace(/```[\s\S]*?```/g, '') // remove code blocks
		.replace(/`[^`]*`/g, '')        // remove inline code
		.replace(/!?\[.*?\]\(.*?\)/g, '') // remove links/images
		.replace(/<[^>]+>/g, '')         // remove HTML tags
		.replace(/^#+\s+/gm, '')         // remove heading markers
		.replace(/[*_~>#|-]/g, '')       // remove markdown formatting
		.trim();

	const words = text.split(/\s+/).filter((w) => w.length > 0).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
