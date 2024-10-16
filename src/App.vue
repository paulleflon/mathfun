<script setup lang='ts'>
import { ref } from 'vue';
import type Settings from './lib/Settings';
import SettingsSelector from './components/SettingsSelector.vue';
import type { InteractiveOperation } from './lib/Operation';
import { generateInteractiveOperation } from './lib/generateOperation';
import OperationDisplay from './components/OperationDisplay.vue';

const settings = ref<Settings>({
	allowedOperations: {
		sum: true,
		difference: true,
		product: true,
		division: false
	},
	allowNegatives: false,
	allowDecimals: false,
	decimalPlaces: 2,
	operationsCount: 10,
	maxAbsoluteValue: 20
});

const operations = ref<InteractiveOperation[]>([]);

const start = () => {
	operations.value = [];
	for (let i = 0; i < settings.value.operationsCount; i++) {
		operations.value.push(generateInteractiveOperation(settings.value));
	}
}

const checkAnswer = (index: number, value: number) => {
	const operation = operations.value[index];
	let result;
	switch (operation.operator) {
		case '+':
			result = operation.operands[0] + operation.operands[1];
			break;
		case '-':
			result = operation.operands[0] - operation.operands[1];
			break;
		case '*':
			result = operation.operands[0] * operation.operands[1];
			break;
		case '/':
			result = operation.operands[0] / operation.operands[1];
			break;
	}
	operations.value[index].correct = result === value;
}

</script>

<template>
	<header>
		<h1>QuickMath</h1>
	</header>
	<button @click='start'>Start</button>
	<div class='operations-container'>
		<OperationDisplay v-for='(operation, index) in operations' :key='index' :operation='operation'
			@update:answer='checkAnswer(index, $event)' />
	</div>
	<SettingsSelector :settings='settings' @update:settings='settings = $event' />
</template>

<style scoped>
.operations-container {
	display: flex;
	flex-wrap: wrap;
}
</style>
