<script>
	import { onMount } from 'svelte'
	import { caption, currentStep, prompt, userPrompt } from '$lib/stores/generate'
	import Typewriter from 'svelte-typewriter'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import { sendRequest } from '$lib/shared/sendRequest'

	const toastStore = getToastStore()

	let loading = true

	onMount(async () => {
		try {
			const request = await sendRequest('prompt', {
				caption: $caption,
				userPrompt: $userPrompt
			})

			if (request.ok) {
				console.log('prompt:')
				console.log(request.data.prompt)
				$prompt = request.data.prompt
			} else {
				toastStore.trigger(request)
			}
		} catch (error) {
			console.error('Error generating prompt:', error)
		} finally {
			loading = false
		}
	})

	const nextStep = () => {
		setTimeout(() => {
			$currentStep += 1
		}, 1500)
	}
</script>

<header class="text-2xl font-bold">Generating the prompt (2/3)</header>
{#if loading}
	<section class="card w-full animate-pulse">
		<div class="p-4 space-y-4">
			<div class="placeholder h-8 bg-gray-200 rounded"></div>
			<div class="grid grid-cols-2 gap-2">
				<div class="placeholder h-8 bg-gray-200 rounded"></div>
				<div class="placeholder h-8 bg-gray-200 rounded"></div>
			</div>
			<div class="placeholder h-8 bg-gray-200 rounded"></div>
		</div>
	</section>
{:else}
	<section class="card w-full">
		<div class="p-4">
			<Typewriter cursor={false} on:done={nextStep}>
				<p>{$prompt}</p>
			</Typewriter>
		</div>
	</section>
{/if}
