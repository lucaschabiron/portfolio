<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div
	class="bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 via-75% dark:to-slate-700 min-h-screen p-2 flex"
>
	<div class="w-1/3 mr-auto">
		<Header />
		<slot />
	</div>
</div>
