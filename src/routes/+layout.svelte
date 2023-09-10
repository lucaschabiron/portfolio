<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="bg-gradient-to-r from-indigo-600 via-indigo-400 via-75% min-h-screen p-2 flex">
	<div class="mr-auto">
		<Header />
		<slot />
	</div>
</div>
