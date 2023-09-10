<script>
	import Logo from './Logo.svelte';
</script>

<nav class="ml-8 rounded-md flex text-white my-8">
	<ul class="flex space-x-6">
		<li>
			<Logo />
		</li>
		<li><a class="hover:bg-indigo-700 rounded-md p-1" href="/">home</a></li>
		<li>
			<a class="hover:bg-indigo-700 rounded-md p-1" href="/projects">projects</a>
		</li>
		<li><a class="hover:bg-indigo-700 rounded-md p-1" href="/blog">blog</a></li>
	</ul>
</nav>
