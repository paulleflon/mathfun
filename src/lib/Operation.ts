export type Operator = '+' | '-' | '*' | '/';
export interface Operation {
	operands: [number, number];
	operator: Operator;
}

export interface InteractiveOperation extends Operation {
	answer: number | null;
	correct: boolean;
}