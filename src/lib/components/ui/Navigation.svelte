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
		<a href="/login" class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-primary` : `btn btn-sm variant-primary`}>Sign in</a>
		<a href="/sign-up" class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-filled-primary` : `btn btn-sm variant-filled-primary`}>Sign up</a>
	{:else}
		<a href="/bookmarks" class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-primary` : `btn btn-sm variant-primary`}>Bookmarks</a>
		<button type="button" on:click={logout} class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-filled-primary` : `btn btn-sm variant-filled-primary`}>Log out</button>
	{/if}
</ul>
