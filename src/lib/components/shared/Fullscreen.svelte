<script>
	import { getModalStore } from '@skeletonlabs/skeleton'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'

	export let parent

	const modalStore = getModalStore()

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl'
	const cImage = 'max-h-[95vh] rounded-container-token overflow-hidden shadow-xl'
</script>

{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>
		<GeneralIcons name="close" class="h-6 w-6 text-black" />
	</button>
	<img src={$modalStore[0]?.image} class={cImage} alt="Full screen" />
{/if}
