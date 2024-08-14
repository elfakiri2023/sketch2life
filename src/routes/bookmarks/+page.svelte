<script>
	import Navbar from '$lib/components/ui/Navbar.svelte'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'
	import { lines } from '$lib/stores/board'
	import { goto } from '$app/navigation'
	import { PUBLIC_BUCKET_URL } from '$env/static/public'
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import Fullscreen from '$lib/components/shared/Fullscreen.svelte'
	import { sendRequest } from '$lib/shared/sendRequest'

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let data

	function editImg(sketch) {
		$lines = JSON.parse(sketch)
		setTimeout(() => {
			goto('/')
		}, 100)
	}

	function fullScreen(url) {
		modalStore.trigger({
			type: 'component',
			image: url,
			component: { ref: Fullscreen }
		})
	}

	function deleteImg(id) {
		modalStore.trigger({
			type: 'confirm',
			title: 'Delete Bookmark',
			body: 'Are you sure you want to delete this bookmark?',
			buttonTextConfirm: 'Delete',
			response: (r) => {
				if (r) {
					deleteRequest(id)
				}
			}
		})
	}

	async function deleteRequest(id) {
		const data = await sendRequest('delete', {
			id
		})

		toastStore.trigger(data)
	}
</script>

<Navbar />
<div class="border-t-2 border-gray-200/50" />

<div class="container mx-auto px-10 my-10">
	<section class="grid grid-cols-2 md:grid-cols-4 gap-7">
		{#each data.bookmarks as bookmark}
			<div class="relative group">
				<img class="h-auto max-w-full rounded-lg" loading="lazy" src={`${PUBLIC_BUCKET_URL}/${bookmark.image_name}`} alt={bookmark.image_name} />
				<div class="absolute inset-0 bg-primary-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<button
						class="bg-primary-400 hover:bg-primary-500 p-2 rounded-full m-2"
						on:click={() => {
							fullScreen(`${PUBLIC_BUCKET_URL}/${bookmark.image_name}`)
						}}
					>
						<GeneralIcons name="full-screen" class="h-6 w-6 text-white" />
					</button>
					<button
						class="bg-surface-400 hover:bg-surface-500 p-2 rounded-full m-2"
						on:click={() => {
							editImg(bookmark.sketch)
						}}
					>
						<GeneralIcons name="edit" class="h-6 w-6 text-white" />
					</button>
					<button
						class="bg-error-400 hover:bg-error-500 p-2 rounded-full m-2"
						on:click={() => {
							deleteImg(bookmark.id)
						}}
					>
						<GeneralIcons name="delete" class="h-6 w-6 text-white" />
					</button>
				</div>
			</div>
		{/each}
	</section>
	{#if data.bookmarks.length === 0}
		<div class="flex justify-center items-center h4">
			<p class="text-primary-200">
				Your bookmarks are currently empty. Why not <a href="/" class="underline text-primary-500">create a new sketch</a>?
			</p>
		</div>
	{/if}
</div>
