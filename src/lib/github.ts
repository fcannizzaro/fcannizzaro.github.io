export interface RepoData {
	stars: number;
	pushedAt: string;
}

export async function fetchRepoData(repos: string[]): Promise<Record<string, RepoData>> {
	const results: Record<string, RepoData> = {};
	await Promise.all(
		repos.map(async (repo) => {
			try {
				const res = await fetch(`https://api.github.com/repos/${repo}`);
				if (res.ok) {
					const data = await res.json();
					results[repo] = {
						stars: data.stargazers_count ?? 0,
						pushedAt: data.pushed_at ?? "",
					};
				}
			} catch {
				results[repo] = { stars: 0, pushedAt: "" };
			}
		}),
	);
	return results;
}
