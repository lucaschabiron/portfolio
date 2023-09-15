import { GITHUB_AUTH } from '$env/static/private';
import { getLatestCommit } from '$lib/utils/getLatestCommit';
import config from '$lib/utils/config';

export async function load() {
	return {
		commit: await getLatestCommit({
			auth: GITHUB_AUTH,
			owner: config.currentWork.owner,
			repo: config.currentWork.repo
		})
	};
}
