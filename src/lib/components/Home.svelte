<script>
	import Frame from './Frame.svelte';
	import CurrentWork from './CurrentWork.svelte';
	import config from '../utils/config';
</script>

<div class="mx-6">
	<h1 class="text-3xl font-bold dark:text-white mb-2">lucas 🌌</h1>
	<ul class="flex space-x-4">
		<li class="text-md font-bold text-slate-700 dark:text-slate-100">builder.</li>
		<li class="text-md font-bold text-slate-700 dark:text-slate-100">developer.</li>
		<li class="text-md font-bold text-slate-700 dark:text-slate-100">learner.</li>
	</ul>
	<Frame title="about me">
		<p class="dark:text-white font-sans text-justify mb-2">
			hi, i'm <strong>lucas</strong>, a passionate <strong>builder</strong> at heart.
		</p>
		<p class="dark:text-white font-sans text-justify">
			whether it's creating <strong>websites</strong>, <strong>music</strong>, or crafting new
			<strong>projects</strong>, i thrive on bringing ideas to life. welcome to my personnal space.
		</p>
	</Frame>
	<Frame title="my work">
		<p class="dark:text-white font-sans text-justify mb-2">
			i'm a <strong>developer</strong> with a passion for
			<strong>web development</strong>.
		</p>
		<p class="dark:text-white font-sans text-justify">
			You can even checkout what i'm currently working on (publicly) in the next section.
		</p>
	</Frame>
	<CurrentWork
		title={config.currentWork.title}
		image={config.currentWork.img}
		link={config.currentWork.link}
	/>
</div>
