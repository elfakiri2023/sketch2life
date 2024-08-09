<script>
	export let name = ''
	export let color = 'currentColor'
</script>

{#if name === 'pen'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path
			fill={color}
			d="m11.4 18.161l7.396-7.396a10.3 10.3 0 0 1-3.326-2.234a10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.75 8.75 0 0 0 2.092 3.32a8.75 8.75 0 0 0 3.431 2.13z"
		/>
	</svg>
{:else if name === 'eraser'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill={color} d="M11.41 5.505C13.08 3.835 13.915 3 14.952 3c1.038 0 1.873.835 3.543 2.505S21 8.01 21 9.048c0 1.037-.835 1.872-2.505 3.542l-4.193 4.194l-7.086-7.086z" />
		<path fill={color} d="m6.156 10.759l7.085 7.085l-.65.65c-.378.379-.713.714-1.018 1.006H21a.75.75 0 0 1 0 1.5H9c-1.016-.025-1.85-.86-3.495-2.505C3.835 16.825 3 15.99 3 14.952c0-1.037.835-1.872 2.505-3.542z" />
	</svg>
{:else if name === 'grab'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$restProps}>
		<path fill={color} d="M216 104v48a88 88 0 0 1-176 0v-16a16 16 0 0 1 32 0v8a8 8 0 0 0 16 0V88a16 16 0 0 1 32 0v16a8 8 0 0 0 16 0V88a16 16 0 0 1 32 0v16a8 8 0 0 0 16 0a16 16 0 0 1 32 0" />
	</svg>
{:else if name === 'trash'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$restProps}>
		<path
			fill={color}
			d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M112 168a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm0-120H96v-8a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8Z"
		/>
	</svg>
{:else if name === 'favorite'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...$$restProps}>
		<path
			fill={color}
			d="M34 16.78a2.22 2.22 0 0 0-1.29-4l-9-.34a.23.23 0 0 1-.2-.15l-3.11-8.4a2.22 2.22 0 0 0-4.17 0l-3.1 8.43a.23.23 0 0 1-.2.15l-9 .34a2.22 2.22 0 0 0-1.29 4l7.06 5.55a.23.23 0 0 1 .08.24l-2.43 8.61a2.22 2.22 0 0 0 3.38 2.45l7.46-5a.22.22 0 0 1 .25 0l7.46 5a2.2 2.2 0 0 0 2.55 0a2.2 2.2 0 0 0 .83-2.4l-2.45-8.64a.22.22 0 0 1 .08-.24Z"
			class="clr-i-solid clr-i-solid-path-1"
		/>
		<path fill="none" d="M0 0h36v36H0z" />
	</svg>
{:else if name === 'logout'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path
			fill={color}
			fill-rule="evenodd"
			d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414"
			clip-rule="evenodd"
		/>
	</svg>
{:else if name === 'undo'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...$$restProps}>
		<path fill={color} d="M16 10.5v-1A4.5 4.5 0 0 0 11.5 5H3.914l2-2L4.5 1.586L.086 6L4.5 10.414L5.914 9l-2-2H11.5a2.5 2.5 0 0 1 0 5H4v2h7.5a4.5 4.5 0 0 0 4.389-3.5z" />
	</svg>
{/if}
