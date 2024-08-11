<script>
	import { tool } from '$lib/stores/board'
	export let name = ''
	export let color = 'currentColor'
</script>

{#if name === 'pen'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path
			fill={$tool === 'pen' ? '#7bc9a7' : color}
			d="m11.4 18.161l7.396-7.396a10.3 10.3 0 0 1-3.326-2.234a10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.75 8.75 0 0 0 2.092 3.32a8.75 8.75 0 0 0 3.431 2.13z"
		/>
	</svg>
{:else if name === 'eraser'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill={$tool === 'eraser' ? '#7bc9a7' : color} d="M11.41 5.505C13.08 3.835 13.915 3 14.952 3c1.038 0 1.873.835 3.543 2.505S21 8.01 21 9.048c0 1.037-.835 1.872-2.505 3.542l-4.193 4.194l-7.086-7.086z" />
		<path
			fill={$tool === 'eraser' ? '#7bc9a7' : color}
			d="m6.156 10.759l7.085 7.085l-.65.65c-.378.379-.713.714-1.018 1.006H21a.75.75 0 0 1 0 1.5H9c-1.016-.025-1.85-.86-3.495-2.505C3.835 16.825 3 15.99 3 14.952c0-1.037.835-1.872 2.505-3.542z"
		/>
	</svg>
{:else if name === 'grab'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$restProps}>
		<path fill={$tool === 'grab' ? '#7bc9a7' : color} d="M216 104v48a88 88 0 0 1-176 0v-16a16 16 0 0 1 32 0v8a8 8 0 0 0 16 0V88a16 16 0 0 1 32 0v16a8 8 0 0 0 16 0V88a16 16 0 0 1 32 0v16a8 8 0 0 0 16 0a16 16 0 0 1 32 0" />
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
{:else if name === 'convert'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...$$restProps}>
		<path
			fill={color}
			d="m5.122.282l-.348 1.071A2.2 2.2 0 0 1 3.376 2.75l-1.072.348l-.022.006a.423.423 0 0 0 0 .798l1.072.348a2.2 2.2 0 0 1 1.399 1.397l.348 1.07a.423.423 0 0 0 .798 0l.348-1.07a2.2 2.2 0 0 1 1.399-1.403l1.072-.348a.423.423 0 0 0 0-.798L7.646 2.75a2.2 2.2 0 0 1-1.377-1.397L5.92.283a.423.423 0 0 0-.799 0M.217 8.213l.766-.248a1.58 1.58 0 0 0 .998-.999l.25-.764a.302.302 0 0 1 .57 0l.248.764a1.58 1.58 0 0 0 .984.999l.765.248a.302.302 0 0 1 0 .57l-.765.249a1.58 1.58 0 0 0-1 1.002l-.248.764a.302.302 0 0 1-.57 0l-.249-.764a1.58 1.58 0 0 0-.999-.999l-.765-.248a.302.302 0 0 1 0-.57zM3 11.901a1.3 1.3 0 0 0 .244-.131c.22-.16.38-.371.48-.621l.26-.802c.03-.08.07-.16.14-.22c.06-.06.14-.11.22-.14l.762-.25c.27-.1.49-.261.65-.481s.24-.481.24-.752c0-.19-.04-.38-.12-.55q.24-.06.45-.21a1.5 1.5 0 0 0 .521-.692l.36-1.092c.09-.23.18-.36.29-.47c.18-.16.321-.241.471-.291l1.061-.35c.3-.1.54-.291.71-.532A1.42 1.42 0 0 0 9.912 3h2.589A2.5 2.5 0 0 1 15 5.5v7c0 .51-.152.983-.414 1.379l-4.384-4.384a1.7 1.7 0 0 0-2.404 0l-4.384 4.384A2.5 2.5 0 0 1 3 12.5zm8.498-4.397a1.002 1.002 0 1 0 0-2.004a1.002 1.002 0 0 0 0 2.004m-2.003 2.698l4.384 4.384A2.5 2.5 0 0 1 12.5 15h-7c-.51 0-.983-.152-1.379-.414l4.384-4.384a.7.7 0 0 1 .99 0"
		/>
	</svg>
{:else if name === 'login'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...$$restProps}>
		<path fill={color} d="M28 4H12a2 2 0 0 0-2 2v7h8.5l-3.38-3.29a1 1 0 0 1 1.41-1.41l5.79 5.79l-5.79 5.79a1 1 0 0 1-1.41-1.41L18.5 15H10v15a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" class="clr-i-solid clr-i-solid-path-1" />
		<path fill={color} d="M10 13H4a1 1 0 0 0-1 1a1 1 0 0 0 1 1h6Z" class="clr-i-solid clr-i-solid-path-2" />
		<path fill="none" d="M0 0h36v36H0z" />
	</svg>
{:else if name === 'bookmark'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...$$restProps}>
		<path fill={color} d="M11 1.5a3 3 0 0 1 3 3v8.546a1.454 1.454 0 0 1-2.411 1.094L8 11l-3.589 3.14A1.454 1.454 0 0 1 2 13.046V4.5a3 3 0 0 1 3-3z" />
	</svg>
{:else if name === 'regenerate'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M9 3.723A9.003 9.003 0 0 0 2.124 14M9 3.723L6 2.5m3 1.223L8 6.5m11.064 10a8.96 8.96 0 0 0 .936-4c0-4.46-3.243-8.161-7.5-8.876M19.064 16.5l2.936-2m-2.936 2l-1.564-3m-13.984 4a8.99 8.99 0 0 0 7.484 4a8.97 8.97 0 0 0 6-2.292M3.516 17.5H7m-3.484 0V21"
			color="currentColor"
		/>
	</svg>
{:else if name === 'download'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
	</svg>
{/if}
