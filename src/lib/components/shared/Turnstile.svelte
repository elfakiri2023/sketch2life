<script>
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { turnstileLoaded, turnstileMounted } from '$lib/stores/general'
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'

	export async function render() {
		const widgetId = turnstile.render('#cf-turnstile', {
			sitekey: PUBLIC_TURNSTILE_SITE_KEY,
			callback: function (token) {
				document.getElementById('submit')?.click()
				setTimeout(() => {
					turnstile.remove(widgetId)
				}, 1000)
			}
		})
	}

	function turnstileCallback() {
		$turnstileLoaded = true
	}

	onMount(() => {
		$turnstileMounted = true
		return () => {
			$turnstileMounted = false
		}
	})
</script>

<svelte:head>
	{#if browser && $turnstileLoaded == false}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" on:load={turnstileCallback} async></script>
	{/if}
</svelte:head>

{#if $turnstileMounted && $turnstileLoaded}
	<div id="cf-turnstile" class="mb-4" data-sitekey={PUBLIC_TURNSTILE_SITE_KEY}></div>
{/if}
