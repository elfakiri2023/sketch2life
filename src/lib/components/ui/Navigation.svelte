<script>
	import { loggedIn } from '$lib/stores/general'
	import { goto } from '$app/navigation'

	export let isMobile = false

	function logout() {
		$loggedIn = false
		goto('/logout')
	}
</script>

<ul {...$$restProps}>
	{#if $loggedIn === false}
		<a href="/login" class={isMobile ? `flex w-full justify-center my-2 btn variant-primary` : `btn variant-primary`}>Sign in</a>
		<a href="/sign-up" class={isMobile ? `flex w-full justify-center my-2 btn variant-filled-primary` : `btn variant-filled-primary`}>Sign up</a>
	{:else}
		<a href="/" class={isMobile ? `flex w-full justify-center my-2 btn variant-filled-primary` : `btn variant-filled-primary`}>Create</a>
		<button type="button" on:click={logout} class={isMobile ? `flex w-full justify-center my-2 btn variant-primary` : `btn variant-primary`}>Log out</button>
	{/if}
</ul>
