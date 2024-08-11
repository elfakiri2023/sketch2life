<script>
	import { onMount } from 'svelte'
	import { currentStep, prompt, generatedImg } from '$lib/stores/generate'

	let loading = true

	onMount(async () => {
		try {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt: $prompt })
			})

			const blob = await res.blob()
			if (blob) {
				$generatedImg = URL.createObjectURL(blob)
			}
		} catch (error) {
			console.error('Error generating prompt:', error)
		} finally {
			loading = false
		}
	})
</script>

<header class="text-2xl font-bold">Generating the image (3/3)</header>
{#if loading}
	<section class=" flex items-center justify-center h-[550px] w-[550px] bg-gray-300 rounded animate-pulse">
		<div class="flex items-center justify-center">
			<svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
				<path
					d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
				/>
			</svg>
		</div>
	</section>
{:else}
	<section class="card w-full flex items-center justify-center">
		<div class="p-4">
			<img src={$generatedImg} alt="Generated img" class="h-[550px] w-[550px]" />
		</div>
	</section>
{/if}
