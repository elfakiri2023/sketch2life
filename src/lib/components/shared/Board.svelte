<script>
	import { Stage, Layer, Line } from 'svelte-konva'
	import { tool, canvasSize, lines, isDrawing, color, imgUrl } from '$lib/stores/board'

	let ref = null
	let lastCenter = null
	let lastDistance = null

	function initDraw(e) {
		if ($tool !== 'pen' && $tool !== 'eraser') return
		$isDrawing = true
		const stage = e.detail.target.getStage()
		const pos = relativePointerPosition(stage)
		lines.update((ls) => [...ls, { tool: $tool, points: [pos.x, pos.y] }])
	}

	function generatePreview(e) {
		const stage = e.detail ? e.detail.target.getStage() : e
		if (stage) {
			const scale = 1
			const url = stage.toDataURL({
				pixelRatio: scale,
				mimeType: 'image/jpeg',
				quality: 0.8
			})
			if (url) {
				$imgUrl = url
			}
			return url
		}
	}

	function handleDraw(e) {
		if ($tool !== 'pen' && $tool !== 'eraser') return
		if (!$isDrawing) return
		const stage = e.detail.target.getStage()
		const point = relativePointerPosition(stage)
		lines.update((ls) => {
			let lastLine = ls[ls.length - 1]
			lastLine.points = lastLine.points.concat([point.x, point.y])
			ls.splice(ls.length - 1, 1, lastLine)
			return ls.concat()
		})
	}

	function stopDraw(e) {
		if ($tool !== 'pen' && $tool !== 'eraser') return
		$isDrawing = false
		generatePreview(e)
	}

	function clearCanvas() {
		ref.clear()
		$isDrawing = false
		$lines = []
		$imgUrl = ''
	}

	function handleZoom(e) {
		if ($tool !== 'grab') return
		const scaleBy = 1.3
		e.evt.preventDefault()
		const stage = e.detail.target.getStage()
		let oldScale = stage.scaleX()
		let mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		}
		let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy
		stage.scale({ x: newScale, y: newScale })
		let newPos = {
			x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
			y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
		}
		stage.position(newPos)
	}

	function handlePinchZoom(e) {
		if ($tool !== 'grab') return
		const stage = e.detail.target.getStage()
		const touch1 = e.evt.touches[0]
		const touch2 = e.evt.touches[1]
		if (!touch1 || !touch2) return
		if (stage.isDragging()) stage.stopDrag()
		const point1 = { x: touch1.clientX, y: touch1.clientY }
		const point2 = { x: touch2.clientX, y: touch2.clientY }
		if (!lastCenter) lastCenter = getCenter(point1, point2)
		const newCenter = getCenter(point1, point2)
		const dist = getDistance(point1, point2)
		if (!lastDistance) lastDistance = dist
		let pointTo = {
			x: (newCenter.x - stage.x()) / stage.scaleX(),
			y: (newCenter.y - stage.y()) / stage.scaleX()
		}
		let scale = stage.scaleX() * (dist / lastDistance)
		stage.scaleX(scale)
		stage.scaleY(scale)
		if (!lastCenter) return
		let dx = newCenter.x - lastCenter.x
		let dy = newCenter.y - lastCenter.y
		let newPos = {
			x: newCenter.x - pointTo.x * scale + dx,
			y: newCenter.y - pointTo.y * scale + dy
		}
	}

	function stopPinchZoom() {
		lastDistance = 0
		lastDistance = null
	}

	function relativePointerPosition(node) {
		let transform = node.getAbsoluteTransform().copy()
		transform.invert()
		let pos = node.getStage().getPointerPosition()
		return transform.point(pos)
	}

	function getCenter(p1, p2) {
		return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
	}

	function getDistance(p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
	}

	$: if (ref) {
		generatePreview(ref)
	}
</script>

<div class="relative w-full h-full bg-black">
	<Stage
		bind:handle={ref}
		on:touchstart={initDraw}
		on:touchmove={(e) => {
			handleDraw(e)
			handlePinchZoom(e)
		}}
		on:touchend={(e) => {
			stopDraw(e)
			stopPinchZoom()
		}}
		config={{
			draggable: $tool === 'grab',
			width: $canvasSize.width,
			height: $canvasSize.height
		}}
		on:mousedown={initDraw}
		on:mousemove={handleDraw}
		on:mouseup={stopDraw}
		on:wheel={handleZoom}
	>
		<Layer>
			{#each $lines as line, i}
				<Line
					config={{
						key: i,
						points: line.points,
						stroke: $color,
						strokeWidth: line.tool === 'eraser' ? 20 : 2,
						tension: 0.2,
						lineCap: 'round',
						lineJoin: 'round',
						globalCompositeOperation: line.tool === 'eraser' ? 'destination-out' : 'source-over'
					}}
				/>
			{/each}
		</Layer>
	</Stage>
</div>
