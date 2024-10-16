export default interface Settings {
	allowedOperations: {
		sum: boolean;
		difference: boolean;
		product: boolean;
		division: boolean;
	}
	allowNegatives: boolean;
	allowDecimals: boolean;
	decimalPlaces: number;
	operationsCount: number;
	maxAbsoluteValue: number;
};

