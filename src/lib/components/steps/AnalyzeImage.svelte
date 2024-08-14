<script>
	import { onMount } from 'svelte'
	import { imgUrl } from '$lib/stores/board'
	import { currentStep, caption } from '$lib/stores/generate'
	import { trimImage } from '$lib/shared/trimImage.js'
	import Typewriter from 'svelte-typewriter'
	import { sendRequest } from '$lib/shared/sendRequest'
	import { getToastStore } from '@skeletonlabs/skeleton'

	const toastStore = getToastStore()

	let loading = true

	onMount(async () => {
		try {
			const croppedBase64 = await trimImage($imgUrl)
			const request = await sendRequest('analyze', {
				img: croppedBase64
			})

			if (request.ok) {
				$caption = request.data.caption
			} else {
				toastStore.trigger(request)
			}
		} catch (error) {
			console.error('Error generating image:', error)
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

<header class="text-2xl font-bold">Analyzing the sketch (1/3)</header>
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
				<p>{$caption}</p>
			</Typewriter>
		</div>
	</section>
{/if}
