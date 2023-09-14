<script lang="ts">
	export let title: string = 'title';
	export let borderColor: string = 'border-slate-300 dark:border-white';
</script>

<div
	class={'rounded-lg border-spacing-3 border-solid p-5 backdrop-blur-sm border-2 my-4 ' +
		borderColor}
>
	<h1 class="text-2xl font-bold dark:text-white mb-2">{title}</h1>
	<slot />
</div>
