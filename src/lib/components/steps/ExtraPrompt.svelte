<script>
	import { imgUrl } from '$lib/stores/board'
	import { userPrompt } from '$lib/stores/generate'
</script>

<header class="text-2xl font-bold">Generate image</header>
<div class="flex flex-col md:flex-row gap-4 p-4">
	<div class="w-full md:w-1/2 flex justify-center items-center">
		<img src={$imgUrl} alt="Placeholder" class="rounded-md h-full object-cover" />
	</div>

	<div class="w-full md:w-1/2 flex">
		<textarea bind:value={$userPrompt} class="w-full h-full textarea resize-none" placeholder="(Optional) Specify any further details to include in the generated image."></textarea>
	</div>
</div>
