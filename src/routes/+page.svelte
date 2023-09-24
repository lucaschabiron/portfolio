<script lang="ts">
	import Home from '$lib/components/Home.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Blog from '$lib/components/Blog.svelte';
	import { activeColumn } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	let column: string;
	let windowWidth: number;
	let sections = ['home', 'projects', 'blog'];
	activeColumn.subscribe((value) => {
		column = value;
	});

	// sections for large devices
	$: sections =
		column === 'home'
			? ['home', 'projects', 'blog']
			: column === 'projects'
			? ['projects', 'blog', 'home']
			: ['blog', 'home', 'projects'];

	// section for small devices
	$: smSection = sections[0];
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [transition: all 1s ease-out]">
	{#if windowWidth > 640}
		{#each sections as section (section)}
			<section
				animate:flip={{ duration: 700, easing: cubicOut }}
				role="button"
				class="column {column === section ? 'active' : ''} {section === sections[1]
					? 'hidden sm:block'
					: ''} {section === sections[2] ? 'hidden lg:block' : ''}"
				on:click={() => activeColumn.set(section)}
				tabindex="0"
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						activeColumn.set(section);
					}
				}}
			>
				{#if section === 'home'}
					<Home />
				{:else if section === 'projects'}
					<Projects />
				{:else}
					<Blog />
				{/if}
			</section>
		{/each}
	{:else if smSection === 'home'}
		<section class="column active" in:fly={{ duration: 700, x: '-100vw' }}>
			<Home />
		</section>
	{:else if smSection === 'projects'}
		<section class="column active" in:fly={{ duration: 700, x: '-100vw' }}>
			<Projects />
		</section>
	{:else}
		<section class="column active" in:fly={{ duration: 700, x: '-100vw' }}>
			<Blog />
		</section>
	{/if}
</div>

<style>
	.column {
		@apply transition-all duration-700 ease-in-out;
	}

	.column:not(.active) {
		@apply filter blur-md opacity-30;
	}
</style>
