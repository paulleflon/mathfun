import type Settings from './Settings';
import * as utils from './utils';

export type Operator = '+' | '-' | '*' | '/';

export class Operation {
	operands: [number, number];
	operator: Operator;

	constructor(operands: [number, number], operator: Operator) {
		this.operands = operands;
		this.operator = operator;
	}

	static operatorFunctions: Record<Operator, (a: number, b: number) => number> = {
		'+': (a: number, b: number) => a + b,
		'-': (a: number, b: number) => a - b,
		'*': (a: number, b: number) => a * b,
		'/': (a: number, b: number) => a / b
	}

	get result() {
		return Operation.operatorFunctions[this.operator](this.operands[0], this.operands[1]);
	}

	toString() {
		return `${this.operands[0]} ${this.operator} ${this.operands[1]}`;
	}
}

export class InteractiveOperation extends Operation {
	answer: number | null = null;
	correct: boolean = false;

	setAnswer(answer: number) {
		console.log(answer);
		this.answer = answer;
		this.correct = this.result === answer;
	}

	static random(settings: Settings) {
		const maxAbs = settings.maxAbsoluteValue;
		const operands: [number, number] = [0, 0];
		operands[0] = utils.random(maxAbs, settings.allowNegatives, settings.allowDecimals);
		operands[1] = utils.random(maxAbs, false, settings.allowDecimals);
		if (settings.allowDecimals) {
			operands[0] = parseFloat(operands[0].toFixed(settings.decimalPlaces));
			operands[1] = parseFloat(operands[1].toFixed(settings.decimalPlaces));
		}
		const operators: Operator[] = [];
		if (settings.allowedOperations.sum) operators.push('+');
		if (settings.allowedOperations.difference) operators.push('-');
		if (settings.allowedOperations.product) operators.push('*');
		if (settings.allowedOperations.division) operators.push('/');
		const operator: Operator = utils.randArray(operators) as Operator;
		return new InteractiveOperation(operands, operator);
	}

	static randomArray(settings: Settings) {
		const operations: InteractiveOperation[] = [];
		for (let i = 0; i < settings.operationsCount; i++) {
			operations.push(InteractiveOperation.random(settings));
		}
		return operations;
	}
}