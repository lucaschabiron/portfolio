<script lang="ts">
	import { activeColumn } from '$lib/stores';
	import Logo from './Logo.svelte';
</script>

<nav class="font-[Subjectivity] ml-8 lg:mx-auto flex dark:text-white mt-8 mb-14 items-center">
	<div class="mr-16 flex-initial"><Logo /></div>

	<ul class="flex space-x-4 sm:space-x-16">
		<li>
			<button class="dark:hover:bg-slate-700 transition-all rounded-md p-1" on:click={()=>activeColumn.set('home')}>home</button>
		</li>
		<li>
			<button class="dark:hover:bg-slate-700 transition-all rounded-md p-1" on:click={() => activeColumn.set('projects')}>projects</button>
		</li>
		<li>
			<button class="dark:hover:bg-slate-700 transition-all rounded-md p-1" on:click={()=>activeColumn.set('blog')}>blog</button>
		</li>
	</ul>
</nav>
