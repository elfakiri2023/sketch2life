<script>
	import { imgUrl } from '$lib/stores/board'
	import { loggedIn } from '$lib/stores/general'
	import { currentStep, generatedImg, prompt, caption } from '$lib/stores/generate'
	import ExtraPrompt from '$lib/components/steps/ExtraPrompt.svelte'
	import AnalyzeImage from '$lib/components/steps/AnalyzeImage.svelte'
	import GeneratePrompt from '$lib/components/steps/GeneratePrompt.svelte'
	import GenerateImage from '$lib/components/steps/GenerateImage.svelte'
	import CanvasIcons from '$lib/components/icons/CanvasIcons.svelte'
	import { getToastStore } from '@skeletonlabs/skeleton'

	export let parent
	let regenerate

	const toastStore = getToastStore()

	function nextStep() {
		$currentStep += 1
	}

	function cancel() {
		parent.onClose()
		$caption = ''
		$prompt = ''
		setTimeout(() => {
			$currentStep = 1
		}, 500)
	}

	function downloadImage() {
		const link = document.createElement('a')
		link.href = $generatedImg

		const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
		const filename = `image-${timestamp}.png`
		link.download = filename

		document.body.appendChild(link)
		link.click()

		document.body.removeChild(link)
		URL.revokeObjectURL(link.href)
	}

	function addToBookmarks() {
		toastStore.trigger({
			message: 'Images saved to bookmarks',
			background: 'variant-filled-primary',
			zIndex: 10000
		})
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
		<GenerateImage bind:generateImage={regenerate} />
	{/if}
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
			{#if $currentStep === 1}
				<button class="btn {parent.buttonPositive}" on:click={nextStep}>Generate</button>
			{:else if $currentStep === 4}
				{#if $loggedIn}
					<button type="button" class="btn variant-filled" on:click={addToBookmarks}>
						<span><CanvasIcons name="bookmark" class="text-warning-500" /></span>
						<span>Save</span>
					</button>
				{/if}
				<button type="button" class="btn variant-filled" on:click={downloadImage}>
					<span><CanvasIcons name="download" class="text-error-800" /></span>
					<span>Download</span>
				</button>
				<button type="button" class="btn variant-filled" on:click={regenerate}>
					<span><CanvasIcons name="regenerate" class="text-surface-700" /></span>
					<span>Re-Generate</span>
				</button>
			{/if}
			<button class="btn {parent.buttonNeutral}" on:click={cancel}>{parent.buttonTextCancel}</button>
	</footer>
</div>
