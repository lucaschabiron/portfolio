<script lang="ts">
	import Frame from './Frame.svelte';
	export let title: string;
	export let image: string;
	export let link: string;
	import Github from '$lib/images/github.svelte';
	import { page } from '$app/stores';
</script>

<Frame borderColor="border-green-500" title="working on 🟢">
	<h1 class="text-2xl font-bold dark:text-white mb-2">{title}</h1>
	<div
		role="link"
		class="max-w-full"
		on:click={() => (window.location.href = link)}
		tabindex="-1"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				window.location.href = link;
			}
		}}
	>
		<img src={image} alt={title} class="w-full h-auto mb-4" />
		<div class="flex items-center justify-center">
			<Github className="w-8 h-8 mr-2 fill-black dark:fill-white" />

			<p class="text-sm dark:text-white">
				latest commit:
				<span class="font-bold">{$page.data.commit}</span>
			</p>
		</div>
	</div>
</Frame>
