export function trimAndKeepLightWhite(base64String, margin = 10, threshold = 240) {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = base64String

		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			canvas.width = img.width
			canvas.height = img.height

			ctx.drawImage(img, 0, 0)

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
			const data = imageData.data

			let top = null,
				bottom = null,
				left = null,
				right = null

			for (let y = 0; y < canvas.height; y++) {
				for (let x = 0; x < canvas.width; x++) {
					const index = (y * canvas.width + x) * 4
					const r = data[index]
					const g = data[index + 1]
					const b = data[index + 2]

					if (r < threshold || g < threshold || b < threshold) {
						data[index + 3] = 0
					} else {
						if (top === null) top = y
						if (left === null || x < left) left = x
						if (right === null || x > right) right = x
						bottom = y
					}
				}
			}

			if (top !== null && left !== null && right !== null && bottom !== null) {
				top = Math.max(0, top - margin)
				left = Math.max(0, left - margin)
				right = Math.min(canvas.width - 1, right + margin)
				bottom = Math.min(canvas.height - 1, bottom + margin)

				const croppedWidth = right - left + 1
				const croppedHeight = bottom - top + 1

				ctx.putImageData(imageData, 0, 0)

				const croppedCanvas = document.createElement('canvas')
				const croppedCtx = croppedCanvas.getContext('2d')
				croppedCanvas.width = croppedWidth
				croppedCanvas.height = croppedHeight
				croppedCtx.drawImage(canvas, left, top, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight)

				const croppedBase64 = croppedCanvas.toDataURL('image/png')
				resolve(croppedBase64)
			}
		}

		img.onerror = (error) => {
			reject(error)
		}
	})
}
