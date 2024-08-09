<script>
	import CanvasIcons from '$lib/components/icons/CanvasIcons.svelte'
	import { popup } from '@skeletonlabs/skeleton'

	export let name
	export let icon
	export let color = 'text-primary-200'
	export let action = () => {}

	const popupHover = {
		event: 'hover',
		target: name,
		placement: 'right'
	}
</script>

<button type="button" class="{color} [&>*]:pointer-events-none" on:click={action} use:popup={popupHover}>
	<CanvasIcons width="1.5em" height="1.5em" name={icon} />
</button>

<div class="card px-2 py-1 variant-filled-primary absolute z-50" data-popup={name}>
	<p>{name}</p>
	<div class="arrow variant-filled-primary" />
</div>
