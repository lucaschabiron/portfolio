<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div
	class="absolute -z-10 bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 via-75% dark:to-slate-700 h-screen w-screen"
/>
<div
	class="opacity-5 -z-10 w-screen h-screen absolute top-0 left-0 bg-[url('/noisebackground.png')] bg-repeat"
/>
<div class="min-h-screen p-2 flex">
	<div class="max-w-screen md:w-1/3 sm:w-1/2">
		<Header />
		<slot />
	</div>
</div>
