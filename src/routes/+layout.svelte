<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>lucas chabiron</title>
</svelte:head>
<div class="fixed -z-10 bg-cover dark:bg-slate-800 h-screen w-screen" />
<div
	class="opacity-5 object-cover -z-10 w-screen h-screen fixed top-0 left-0 bg-[url('/noisebackground.png')] bg-repeat"
/>
<main class="p-safe">
	<div class="min-h-screen p-2 flex">
		<div class="w-screen flex flex-col">
			<Header />
			<slot />
		</div>
	</div>
</main>
