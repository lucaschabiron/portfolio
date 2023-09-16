<script lang="ts">
	import Home from '$lib/components/Home.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Blog from '$lib/components/Blog.svelte';
	import { slide } from 'svelte/transition';
	import {activeColumn} from '$lib/stores';

	let column: string;
	activeColumn.subscribe(value => {
		column = value
	});

</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [transition: all 1s ease-out]">
	<section
		in:slide={{duration: 500}}
		out:slide={{duration: 500}}
		role="button"
		class="column {column === 'home' ? 'active order-first' : ''} {column === 'projects' ? 'hidden lg:block' : 'block'} {column === 'blog' ? 'hidden sm:block' : 'block'}"
		on:click={() => activeColumn.set('home')}
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				activeColumn.set('home');
			}
		}}
	>
		<Home />
	</section>
	<section
		in:slide={{duration: 500}}
		out:slide={{duration: 500}}
		role="button"
		class="column {column === 'projects' ? 'active ' : ''} {column === 'home' ? 'hidden sm:block' : 'block'} {column === 'blog' ? 'hidden lg:block' : 'block'}"
		on:click={() => activeColumn.set('projects')}
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				activeColumn.set('projects');
			}
		}}
	>
		<Projects />
	</section>
	<section
		in:slide={{duration: 500}}
		out:slide={{duration: 500}}
		role="button"
		class="column {column === 'blog' ? 'active' : ''} {column === 'home' ? 'hidden lg:block' : 'block'} {column === 'projects' ? 'hidden sm:block' : 'block'}"
		on:click={() => activeColumn.set('blog')}
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				activeColumn.set('blog');
			}
		}}
	>
		<Blog />
	</section>
</div>
<style>
	.column {
		transition: all 0.3s ease-in-out;
	}

	.column:not(.active) {
		@apply filter blur-md opacity-30;
	}
</style>
