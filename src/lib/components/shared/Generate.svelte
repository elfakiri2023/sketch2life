<script>
	import { imgUrl } from '$lib/stores/board'
	import { currentStep, userPrompt, prompt, caption } from '$lib/stores/generate'
	import ExtraPrompt from '$lib/components/steps/ExtraPrompt.svelte'
	import AnalyzeImage from '$lib/components/steps/AnalyzeImage.svelte'
	import GeneratePrompt from '$lib/components/steps/GeneratePrompt.svelte'
	import GenerateImage from '$lib/components/steps/GenerateImage.svelte'

	export let parent

	const nextStep = () => {
		$currentStep += 1
	}

	const cancel = () => {
		parent.onClose()
		$userPrompt = ''
		$caption = ''
		$prompt = ''
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
	{:else if $currentStep === 3}
		<GeneratePrompt />
	{:else if $currentStep === 4}
		<GenerateImage />
	{/if}
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={cancel}>{parent.buttonTextCancel}</button>
			{#if $currentStep === 1}
				<button class="btn {parent.buttonPositive}" on:click={nextStep}>Generate</button>
			{/if}
			
	</footer>
</div>
