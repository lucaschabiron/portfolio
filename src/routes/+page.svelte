<script>
	import Home from '$lib/components/Home.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Blog from '$lib/components/Blog.svelte';
	let currentPage = 'home';
</script>

{#if currentPage === 'home'}
	<Home />
{:else if currentPage === 'projects'}
	<Projects />
{:else if currentPage === 'blog'}
	<Blog />
{/if}
