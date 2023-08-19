import { expect } from 'vitest'

export function expectColorToEqual (colorA: Record<string, number>, colorB: Record<string, number>) {
	for (const channel in colorA) {
		expect(colorA[channel]).toBeCloseTo(colorB[channel] as number)
	}
}
