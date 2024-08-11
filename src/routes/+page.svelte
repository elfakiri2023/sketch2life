<script>
	import { onMount } from 'svelte'
	import { tool, canvasSize, lines, imgUrl } from '$lib/stores/board'
	import { loggedIn } from '$lib/stores/general'
	import MenuItem from '$lib/components/ui/MenuItem.svelte'
	import { goto } from '$app/navigation'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import Generate from '$lib/components/shared/Generate.svelte'

	const modalStore = getModalStore()

	let containerRef = null
	let board = null

	onMount(async () => {
		board = (await import('$lib/components/shared/Board.svelte')).default
	})

	$: if (containerRef) {
		$canvasSize.width = containerRef.offsetWidth
		$canvasSize.height = containerRef.offsetHeight
	}

	const menuItems = {
		top: [
			{
				name: 'Pen',
				icon: 'pen',
				action: () => {
					$tool = 'pen'
				}
			},
			{
				name: 'Eraser',
				icon: 'eraser',
				action: () => {
					$tool = 'eraser'
				}
			},
			{
				name: 'Grab',
				icon: 'grab',
				action: () => {
					$tool = 'grab'
				}
			},
			{
				seperator: true
			},
			{
				name: 'Undo',
				icon: 'undo',
				action: () => {
					$lines = $lines.slice(0, -1)
				}
			},
			{
				name: 'Clear',
				icon: 'trash',
				action: () => {
					$lines = []
				}
			}
		],
		bottom: [
			{
				name: 'Generate',
				icon: 'convert',
				color: 'text-primary-500',
				action: async () => {
					modalStore.trigger({
						type: 'component',
						component: { ref: Generate }
					})
				}
			},
			{
				name: 'Bookmarks',
				icon: 'bookmark',
				color: 'text-yellow-500',
				action: () => {
					if ($loggedIn) {
						goto('/bookmarks')
					} else {
						needLogin()
					}
				}
			}
		]
	}

	function needLogin() {
		const modal = {
			type: 'confirm',
			title: 'You need to log in',
			body: 'Please log in to access bookmarks.',
			buttonTextConfirm: 'Login',
			response: (r) => {
				if (r) {
					goto('/login')
				}
			}
		}
		modalStore.trigger(modal)
	}
</script>

<div class="flex h-screen bg-black">
	<div class="flex flex-col justify-between w-16 bg-surface-800">
		<div>
			<nav class="list-nav flex justify-center items-center">
				<ul>
					{#each menuItems.top as item}
						<li>
							{#if item.seperator}
								<div class="h-1 bg-surface-900 my-2 w-full"></div>
							{:else}
								<MenuItem name={item.name} icon={item.icon} color={item.color} action={item.action} />
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="mb-1">
			<nav class="list-nav flex justify-center items-center">
				<ul>
					{#each menuItems.bottom as item}
						<li>
							{#if item.seperator}
								<div class="h-1 bg-surface-900 my-2 w-full"></div>
							{:else}
								<MenuItem name={item.name} icon={item.icon} color={item.color} action={item.action} />
							{/if}
						</li>
					{/each}
					{#if $loggedIn}
						<li>
							<MenuItem
								name="Logout"
								icon="logout"
								color="text-red-400"
								action={() => {
									$loggedIn = false
									goto('/logout')
								}}
							/>
						</li>
					{:else}
						<li>
							<MenuItem name="Login" icon="login" color="text-surface-400" action={() => goto('/login')} />
						</li>
					{/if}
				</ul>
			</nav>
		</div>
	</div>
	<div class="flex-grow flex justify-center items-center xoverflow-hidden relative" class:cursor-grab={$tool === 'grab'} class:cursor-crosshair={$tool === 'pen'} class:cursor-pointer={$tool === 'eraser'} bind:this={containerRef}>
		<svelte:component this={board} />
	</div>
</div>
