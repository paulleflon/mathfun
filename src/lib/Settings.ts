import type { Operator } from './Operation';

export default interface Settings {
	allowedOperations: Set<Operator>;
	allowNegatives: boolean;
	allowDecimals: boolean;
	decimalPlaces: number;
	maxAbsoluteValue: number;
};

export function checkQuerySettings(query: )