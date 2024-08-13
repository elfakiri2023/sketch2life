<script>
	import '../app.postcss'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	import { initializeStores } from '@skeletonlabs/skeleton'
	import { Toast, Modal } from '@skeletonlabs/skeleton'
	import { loggedIn, user } from '$lib/stores/general'
	import Head from '$lib/components/shared/Head.svelte'
	import { beforeNavigate } from '$app/navigation'
	import { mobileNavOpen } from '$lib/stores/general'

	beforeNavigate(() => mobileNavOpen.set(false))

	export let data

	$: loggedIn.set(data.loggedIn)
	$: user.set(data.user)

	initializeStores()

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
</script>

<Toast zIndex="10000" position="tr" />
<Modal />
<Head />
<main class="grow">
	<div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
		<slot />
	</div>
</main>
