<script lang="ts">
	export let title: string = 'title';
	export let borderColor: string = 'border-slate-300 dark:border-slate-400';
</script>

<div
	class={'rounded-lg border-spacing-3 border-solid p-2 dark:bg-slate-700/20 backdrop-blur-md border my-4 ' +
		borderColor}
>
	<h1 class="text-2xl font-bold dark:text-white m-2">{title}</h1>
	<div class="border border-slate-500 p-4 rounded-lg dark:bg-slate-800">
		<slot />
	</div>
</div>
