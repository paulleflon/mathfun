<script setup lang='ts'>
import { ref } from 'vue';
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

const start = () => {
	operations.value = [];
	operations.value = InteractiveOperation.randomArray(settings.value);
}

</script>

<template>
	<header>
		<h1>QuickMath</h1>
	</header>
	<button @click='start'>Start</button>
	<div class='operations-container'>
		<OperationDisplay v-for='(operation, index) in operations' :key='index' :operation='operation'
			@update:answer='e => operation.setAnswer(e)' class='{{  }}' />
	</div>
	<SettingsSelector :settings='settings' @update:settings='settings = $event' />
</template>

<style scoped>
.operations-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
</style>
