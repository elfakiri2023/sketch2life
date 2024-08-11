<script>
	import { onMount } from 'svelte'
	import { imgUrl, currentStep } from '$lib/stores/board'
	import { trimImage } from '$lib/shared/trimImage.js'
	import Typewriter from 'svelte-typewriter'

	let caption = ''
	let loading = true

	onMount(async () => {
		try {
			const croppedBase64 = await trimImage($imgUrl)
			const res = await fetch('/api/analyze', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ img: croppedBase64 })
			})

			const data = await res.json()
			if (data.caption) {
				caption = data.caption
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

{#if loading}
	<header class="text-2xl font-bold">Analyzing the image</header>
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
				<p>{caption}</p>
			</Typewriter>
		</div>
	</section>
{/if}
