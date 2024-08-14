<script>
	import Navbar from '$lib/components/ui/Navbar.svelte'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'
	import { lines } from '$lib/stores/board'
	import { goto } from '$app/navigation'
	import { PUBLIC_BUCKET_URL } from '$env/static/public'

	export let data

	console.log(data)

	function editImg(sketch) {
		console.log('lines: ' + sketch)
		/* $lines = []
		goto('/') */
	}

	function fullScreen(url) {
		console.log('image url: ' + url)
	}
	function deleteImg(id) {
		console.log('delete img: ' + id)
	}
</script>

<Navbar />
<div class="border-t-2 border-gray-200/50" />

<div class="container mx-auto px-10 my-10">
	<section class="grid grid-cols-2 md:grid-cols-4 gap-7">
		{#each data.bookmarks as bookmark}
			<div class="relative group">
				<img class="h-auto max-w-full rounded-lg" src={`${PUBLIC_BUCKET_URL}/${bookmark.image_name}`} alt={bookmark.image_name} />
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
