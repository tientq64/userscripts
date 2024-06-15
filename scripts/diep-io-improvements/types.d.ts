namespace diepIO {
	declare var input: {
		execute(command: string): void
		grantReward(): void
		mouse(x: number, y: number): void
		key_down(keyCode: number): void
		key_up(keyCode: number): void
	}

	declare var ui: {
		screen: 'home' | 'game' | 'stats'
		game: UIGame | null
		__playerAttributes: UIPlayerAttributes
	}

	type UIGame = {
		selectedGameMode: UIGameMode
	}

	type UIPlayerAttributes = {
		pointsLeft: number
		attributes: UIAttribute[]
	}

	type UIAttribute = {
		index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
		name: UIAttributeName
		slotsFilled: number
		slotsWanted: number
		totalSlots: number
	}

	type UIAttributeName =
		| 'Movement Speed'
		| 'Bullet Damage'
		| 'Bullet Penetration'
		| 'Bullet Speed'
		| 'Body Damage'
		| 'Max Health'
		| 'Health Regen'

	type UIGameMode = 'ffa' | 'teams' | '4teams' | 'event' | 'maze' | 'sandbox'
}
