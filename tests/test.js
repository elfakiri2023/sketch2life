import { test, expect } from '@playwright/test'

test.describe('Sketch2life Canvas App', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('Page title is correct', async ({ page }) => {
		await expect(page).toHaveTitle('Sketch2life | bring your imagination to life')
	})

	test('Canvas area is present', async ({ page }) => {
		const canvas = page.locator('.flex-grow.flex.justify-center.items-center.overflow-hidden.cursor-crosshair')
		await expect(canvas).toBeVisible()
	})

	test('Dark mode is enabled by default', async ({ page }) => {
		const htmlElement = page.locator('html')
		await expect(htmlElement).toHaveClass(/dark/)
	})

	test('Drawing on canvas changes cursor', async ({ page }) => {
		const canvas = page.locator('.flex-grow.flex.justify-center.items-center.overflow-hidden.cursor-crosshair')
		await canvas.hover()
		await expect(canvas).toHaveCSS('cursor', 'crosshair')
	})
})
