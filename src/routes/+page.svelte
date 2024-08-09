<script>
	import { onMount } from 'svelte'
	import { eventName, canvasSize, lines, imgUrl } from '$lib/stores/board'
	import MenuItem from '$lib/components/ui/MenuItem.svelte'
	import { goto } from '$app/navigation'
	import { getModalStore } from '@skeletonlabs/skeleton'

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
					$eventName = 'DRAW'
				}
			},
			{
				name: 'Eraser',
				icon: 'eraser',
				action: () => {
					$eventName = 'ERASE'
				}
			},
			{
				name: 'Grab',
				icon: 'grab',
				action: () => {
					$eventName = 'GRAB'
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
				icon: 'favorite',
				color: 'text-yellow-500',
				action: async () => {
					console.log(JSON.stringify($lines))
					const res = await fetch('/api/generate', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ img: $imgUrl })
					})

					const blob = await res.blob()
					const data = URL.createObjectURL(blob)

					modalStore.trigger({
						type: 'alert',
						/* 						title: 'Example Alert',
						body: 'This is an example modal.', */
						image: data
					})
				}
			}
			/* {
				name: 'Logout',
				color: 'text-red-400',
				icon: 'logout',
				action: () => {
					alert('/logout')
				}
			} */
		]
	}
</script>

<div class="flex h-screen">
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
				</ul>
			</nav>
		</div>
	</div>
	<div
		class="flex-grow flex justify-center items-center xoverflow-hidden relative"
		class:cursor-grab={$eventName === 'GRAB'}
		class:cursor-crosshair={$eventName === 'DRAW'}
		class:cursor-pointer={$eventName === 'ERASE'}
		bind:this={containerRef}
	>
		<svelte:component this={board} />
	</div>
</div>
