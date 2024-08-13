<script>
	import Navbar from '$lib/components/ui/Navbar.svelte'
</script>

<Navbar />
<div class="border-t-2 border-gray-200" />

<div class="container mx-auto px-10 my-10">
	<section class="grid grid-cols-2 md:grid-cols-3 gap-6">
		{#each { length: 10 } as _, i}
			<div>
				<img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=512&h=512&auto=format&fit=crop" alt="" />
			</div>
		{/each}
	</section>
</div>
