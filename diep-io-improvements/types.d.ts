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
}

type UIGame = {
	selectedGameMode: UIGameMode
}

type UIGameMode = 'ffa' | 'teams' | '4teams' | 'event' | 'maze' | 'sandbox'
