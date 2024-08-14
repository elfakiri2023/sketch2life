<script>
	import '../app.postcss'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	import { initializeStores } from '@skeletonlabs/skeleton'
	import { Toast, Modal } from '@skeletonlabs/skeleton'
	import { loggedIn, user } from '$lib/stores/general'
	import Head from '$lib/components/shared/Head.svelte'
	import { beforeNavigate } from '$app/navigation'
	import { mobileNavOpen, turnstileMounted } from '$lib/stores/general'

	beforeNavigate(() => {
		$mobileNavOpen = false
		$turnstileMounted = false
	})

	export let data

	$: $loggedIn = data.loggedIn
	$: $user = data.user

	initializeStores()

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
</script>

<Toast zIndex="z-[10000]" position="br" />
<Modal />
<Head />
<main class="grow">
	<div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
		<slot />
	</div>
</main>
