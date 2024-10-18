<script setup lang='ts'>
import { ref, useTemplateRef } from 'vue';
import type Settings from './lib/Settings';
import SettingsSelector from './components/SettingsSelector.vue';
import { InteractiveOperation } from './lib/Operation';
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



//const operations = ref<InteractiveOperation[]>([]);
const operations = ref<InteractiveOperation[]>(InteractiveOperation.randomArray(settings.value));
const current = ref(0);

const start = () => {
	operations.value = [];
	operations.value = InteractiveOperation.randomArray(settings.value);
}

const updateAnswer = (value: number, index: number) => {
	const op = operations.value[index];
	op.setAnswer(value);
	if (op.correct)
		current.value++;
}

</script>

<template>
	<header>
		<h1>QuickMath</h1>
	</header>
	<button @click='start'>Start</button>
	<div class='operations-container'>
		<OperationDisplay v-for='(operation, index) in operations' :key='index' :operation='operation'
			@update:answer='(value) => updateAnswer(value, index)' :index='index - current'
			:position='index === current ? "current" : index > current ? "next" : "previous"' />
	</div>
	<SettingsSelector :settings='settings' @update:settings='settings = $event' />
</template>

<style scoped>
.operations-container {
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	flex: 1;
}

.operations-container .operation {
	position: absolute;
}
</style>
