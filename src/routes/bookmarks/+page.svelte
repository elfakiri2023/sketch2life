<script>
	import Navbar from '$lib/components/ui/Navbar.svelte'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'
</script>

<Navbar />
<div class="border-t-2 border-gray-200" />

<div class="container mx-auto px-10 my-10">
	<section class="grid grid-cols-2 md:grid-cols-4 gap-7">
		{#each { length: 10 } as _, i}
			<div class="relative group">
				<img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=1024&h=1024&auto=format&fit=crop" alt="" />
				<div class="absolute inset-0 bg-primary-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<button class="bg-surface-400 hover:bg-surface-500 p-2 rounded-full m-2">
						<GeneralIcons name="edit" class="h-6 w-6 text-white" />
					</button>
					<button class="bg-surface-400 hover:bg-surface-500 p-2 rounded-full m-2">
						<GeneralIcons name="full-screen" class="h-6 w-6 text-white" />
					</button>
				</div>
			</div>
		{/each}
	</section>
</div>
