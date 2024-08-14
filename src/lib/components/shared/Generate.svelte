<script>
	import { imgUrl } from '$lib/stores/board'
	import { loggedIn } from '$lib/stores/general'
	import { currentStep, generatedImg, prompt, caption } from '$lib/stores/generate'
	import { lines } from '$lib/stores/board'
	import ExtraPrompt from '$lib/components/steps/ExtraPrompt.svelte'
	import AnalyzeImage from '$lib/components/steps/AnalyzeImage.svelte'
	import GeneratePrompt from '$lib/components/steps/GeneratePrompt.svelte'
	import GenerateImage from '$lib/components/steps/GenerateImage.svelte'
	import CanvasIcons from '$lib/components/icons/CanvasIcons.svelte'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import { sendRequest } from '$lib/shared/sendRequest'

	export let parent
	let regenerate
	let saveText = 'Save'
	let canDownload = true

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
		canDownload = false
		setTimeout(() => {
			canDownload = true
		}, 2000)

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

	async function addToBookmarks() {
		saveText = 'Saving...'

		try {
			const img = await fetch($generatedImg)
				.then((res) => res.blob())
				.then(
					(blob) =>
						new Promise((resolve) => {
							const reader = new FileReader()
							reader.onloadend = () => resolve(reader.result)
							reader.readAsDataURL(blob)
						})
				)
			const data = await sendRequest('save', {
				lines: $lines,
				image: img
			})

			console.log('lines')
			console.log($lines)
			console.log('image')
			console.log($imgUrl)

			if (data.success) {
				toastStore.trigger({
					message: 'Sketch & Image saved to bookmarks',
					background: 'variant-filled-primary'
				})
				saveText = 'Saved'
			} else {
				toastStore.trigger({
					message: 'Failed to save Sketch & Image to bookmarks',
					background: 'variant-filled-error'
				})
				saveText = 'Save'
			}
		} catch (error) {
			console.error('Error saving image:', error)
		}
	}

	function regenerateImage() {
		regenerate()
		saveText = 'Save'
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
					<button type="button" class="btn variant-filled" disabled={saveText !== 'Save' || $generatedImg === '' || $lines.length === 0} on:click={addToBookmarks}>
						<span><CanvasIcons name="bookmark" class="text-warning-500" /></span>
						<span>{saveText}</span>
					</button>
				{/if}
				<button type="button" class="btn variant-filled" disabled={!canDownload || $generatedImg === '' || $lines.length === 0} on:click={downloadImage}>
					<span><CanvasIcons name="download" class="text-error-800" /></span>
					<span>Download</span>
				</button>
				<button type="button" class="btn variant-filled" on:click={regenerateImage}>
					<span><CanvasIcons name="regenerate" class="text-surface-700" /></span>
					<span>Re-Generate</span>
				</button>
			{/if}
			<button class="btn {parent.buttonNeutral}" on:click={cancel}>{parent.buttonTextCancel}</button>
	</footer>
</div>
