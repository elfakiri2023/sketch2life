<script>
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
</script>
