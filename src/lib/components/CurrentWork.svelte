<script lang="ts">
	import Frame from './Frame.svelte';
	export let title: string;
	export let image: string;
	export let link: string;
	import Github from '$lib/images/github.svelte';
</script>

<Frame borderColor="border-green-500" title="working on 🟢">
	<h1 class="text-2xl font-bold dark:text-white mb-2">{title}</h1>
	<button class="max-w-full" on:click={() => (window.location.href = link)}>
		<img src={image} alt={title} class="w-full h-auto mb-4" />
		<div class="flex items-center justify-center">
			<Github color="#fff" className="w-8 h-8 mr-2" />

			<p class="text-sm font-bold dark:text-white">
				last commit: {new Date().toLocaleDateString()}
			</p>
		</div>
	</button>
</Frame>
