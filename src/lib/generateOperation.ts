import type { InteractiveOperation, Operator } from './Operation';
import type { Operation } from './Operation';
import type Settings from './Settings';

function random(maxAbs: number, allowNegatives: boolean, allowDecimal: boolean): number {
	let randomNumber = Math.random() * maxAbs;
	if (allowNegatives && Math.random() < 0.5) {
		randomNumber *= -1;
	}
	if (!allowDecimal) {
		randomNumber = Math.floor(randomNumber);
	}
	return randomNumber;
}

function randArray<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

export function generateOperation(settings: Settings): Operation {
	const maxAbs = settings.maxAbsoluteValue;
	const operands: [number, number] = [0, 0];
	operands[0] = random(maxAbs, settings.allowNegatives, settings.allowDecimals);
	operands[1] = random(maxAbs, false, settings.allowDecimals);
	if (settings.allowDecimals) {
		operands[0] = parseFloat(operands[0].toFixed(settings.decimalPlaces));
		operands[1] = parseFloat(operands[1].toFixed(settings.decimalPlaces));
	}
	const operators = [];
	if (settings.allowedOperations.sum) operators.push('+');
	if (settings.allowedOperations.difference) operators.push('-');
	if (settings.allowedOperations.product) operators.push('*');
	if (settings.allowedOperations.division) operators.push('/');
	const operator: Operator = randArray(operators) as Operator;
	return { operands, operator };
}

export function generateInteractiveOperation(settings: Settings): InteractiveOperation {
	const operation = generateOperation(settings);
	return {
		...operation,
		correct: false,
		answer: null
	};
}