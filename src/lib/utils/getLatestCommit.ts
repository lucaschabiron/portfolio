import { Octokit } from 'octokit';

type commitParams = {
	owner: string;
	repo: string;
	auth: string;
};

export const getLatestCommit = async ({ owner, repo, auth }: commitParams): Promise<string> => {
	const octokit = new Octokit({
		auth: auth
	});

	const date = await octokit
		.request('GET /repos/{owner}/{repo}/commits', {
			owner: owner,
			repo: repo,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			},
			per_page: 1
		})
		.then((response) => {
			return response.data[0].commit.author?.date;
		})
		.catch((error) => {
			console.log(error);
		});

	if (!date) return 'unknown';

	const timeSince = Date.now() - new Date(date).getTime();
	const daysSince = Math.floor(timeSince / (1000 * 60 * 60 * 24));
	const hoursSince = Math.floor(timeSince / (1000 * 60 * 60));
	const minutesSince = Math.floor(timeSince / (1000 * 60));
	if (daysSince > 0) return `${daysSince} day${daysSince > 1 ? 's' : ''} ago`;
	if (hoursSince > 0) return `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
	if (minutesSince > 0) return `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
	return 'just now';
};
