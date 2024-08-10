<script>
	/* const croppedBase64 = await trimImage($imgUrl)
	const res = await fetch('/api/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ img: croppedBase64 })
	})

	const blob = await res.blob()
	const data = URL.createObjectURL(blob) */

	import { imgUrl, currentStep } from '$lib/stores/board'

	export let parent

	const steps = [
		{
			title: 'Step 1',
			description: 'Upload an image',
			component: 'UploadImage'
		},
		{
			title: 'Step 2',
			description: 'Crop the image',
			component: 'CropImage'
		},
		{
			title: 'Step 3',
			description: 'Generate the image',
			component: 'GenerateImage'
		}
	]

	const nextStep = () => {
		$currentStep += 1
	}
</script>

<div class="card p-4 w-modal max-w-[900px] shadow-xl space-y-4">
	<header class="text-2xl font-bold">Generate image</header>
	{#if $currentStep === 1}
		<div class="flex flex-col md:flex-row gap-4 p-4">
			<div class="w-full md:w-1/2 flex justify-center items-center">
				<img src={$imgUrl} alt="Placeholder" class="rounded-md h-full object-cover" />
			</div>

			<div class="w-full md:w-1/2 flex">
				<textarea class="w-full h-full textarea resize-none" placeholder="(Optional) Specify any further details to include in the image."></textarea>
			</div>
		</div>
	{:else if $currentStep === 2}
		<section class="card w-full animate-pulse">
			<div class="p-4 space-y-4">
				<div class="placeholder" />
				<div class="grid grid-cols-3 gap-8">
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
				</div>
				<div class="grid grid-cols-4 gap-4">
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
				</div>
			</div>
		</section>
	{/if}
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={nextStep}>Generate</button>
	</footer>
</div>
