<script>
	import Home from '$lib/components/Home.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Blog from '$lib/components/Blog.svelte';
	let currentPage = 'home';
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
	<div class="order-1">
		<Home />
	</div>
</div>
