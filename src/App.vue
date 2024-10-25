<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import OperationDisplay from './components/OperationDisplay.vue';
import SettingsSelector from './components/SettingsSelector.vue';
import { InteractiveOperation } from './lib/Operation';
import type Settings from './lib/Settings';

const settings = ref<Settings>({
	allowedOperations: new Set(['+', '-']),
	allowNegatives: false,
	allowDecimals: false,
	decimalPlaces: 2,
	maxAbsoluteValue: 20
});

const operations = ref<InteractiveOperation[]>(InteractiveOperation.randomArray(10, settings.value));
const current = ref(0);

const updateAnswer = (value: number, index: number) => {
	const op = operations.value[index];
	op.setAnswer(value);
	if (op.correct) {
		current.value++;
		operations.value.push(InteractiveOperation.random(settings.value));
	}
}

watch(settings, (newSettings: Settings) => {
	operations.value = InteractiveOperation.randomArray(operations.value.length, newSettings);
	current.value = 0;
}, { deep: true });

</script>

<template>
	<header>
		<h1>MathFun</h1>
	</header>
	<div class='operations-container'>
		<OperationDisplay v-for='(operation, index) in operations' :key='index' :operation='operation'
			@update:answer='(value) => updateAnswer(value, index)' :index='index - current'
			:position='index === current ? "current" : index > current ? "next" : "previous"' />
	</div>
	<SettingsSelector :settings='settings' @update:settings='settings = $event' />
</template>

<style scoped>
.operations-container {
	position: absolute;
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
