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
	import ExtraPrompt from '$lib/components/steps/ExtraPrompt.svelte'
	import AnalyzeImage from '$lib/components/steps/AnalyzeImage.svelte'

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

	const cancel = () => {
		parent.onClose()
		setTimeout(() => {
			$currentStep = 1
		}, 500)
	}
</script>

<div class="card p-4 w-modal max-w-[900px] shadow-xl space-y-4">
	{#if $currentStep === 1}
		<ExtraPrompt />
	{:else if $currentStep === 2}
		<AnalyzeImage />
	{/if}
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={cancel}>{parent.buttonTextCancel}</button>
			{#if $currentStep === 1}
				<button class="btn {parent.buttonPositive}" on:click={nextStep}>Generate</button>
			{/if}
			
	</footer>
</div>
