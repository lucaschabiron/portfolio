<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div
	class="fixed -z-10 bg-cover bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 via-75% dark:to-slate-700 h-screen w-screen"
/>
<div
	class="opacity-5 object-cover -z-10 w-screen h-screen fixed top-0 left-0 bg-[url('/noisebackground.png')] bg-repeat"
/>
<div class="min-h-screen p-2 flex">
	<div class="w-screen lg:w-1/3 sm:w-1/2">
		<Header />
		<slot />
	</div>
</div>
