<script>
	import { getModalStore } from '@skeletonlabs/skeleton'

	export let parent

	const modalStore = getModalStore()

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl'
	const cImage = 'max-w-[90%] max-h-[90%] rounded-container-token overflow-hidden shadow-xl'
</script>

{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>×</button>
	<img src={$modalStore[0]?.image} class={cImage} alt="Full screen" />
{/if}
