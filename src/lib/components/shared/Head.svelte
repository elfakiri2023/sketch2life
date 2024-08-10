<script>
	import { currentPage } from '$lib/stores/general'
	import { page } from '$app/stores'

	let info = {
		title: 'Sketch2life',
		subTitle: 'bring your imagination to life',
		description:
			'Unleash your creativity with Sketch2life! Turn your hand-drawn sketches into stunning, realistic images in just moments. Whether you’re a budding artist or simply love to doodle, Sketch2life makes it easy to bring your imagination to life. Start creating today!'
	}

	$: url = `${$page.url.protocol}//${$page.url.host}${$page.url.pathname}`
	$: title = $currentPage === 'home' ? `${info.title} | ${info.subTitle}` : `${$currentPage} - ${info.title}`
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={info.description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={info.description} />
	<meta property="og:url" content={url} />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={info.description} />
</svelte:head>
