<script>
	import Logo from './Logo.svelte';
</script>

<nav class="font-[Subjectivity] ml-8 rounded-md flex text-white my-8 items-center">
	<div class="mr-16"><Logo /></div>

	<ul class="flex space-x-16">
		<li><a class="hover:bg-slate-700 rounded-md p-1" href="/">home</a></li>
		<li>
			<a class="hover:bg-slate-700 rounded-md p-1" href="/projects">projects</a>
		</li>
		<li><a class="hover:bg-slate-700 rounded-md p-1" href="/blog">blog</a></li>
	</ul>
</nav>
