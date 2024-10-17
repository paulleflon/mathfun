export function random(maxAbs: number, allowNegatives: boolean, allowDecimal: boolean): number {
	let randomNumber = Math.random() * maxAbs;
	if (allowNegatives && Math.random() < 0.5) {
		randomNumber *= -1;
	}
	if (!allowDecimal) {
		randomNumber = Math.floor(randomNumber);
	}
	return randomNumber;
}

export function randArray<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}