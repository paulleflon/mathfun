<script setup lang='ts'>
import { ref, watch } from 'vue';
import type Settings from '@/lib/Settings';

const props = defineProps<{ settings: Settings }>();
const model = ref<Settings>({ ...props.settings });
const emit = defineEmits<{
	(e: 'update:settings', settings: Settings): void;
}>();

watch(model, (newModel) => {
	emit('update:settings', newModel);
}, { deep: true });
</script>


<template>
	<div class='settings-selector'>
		<h2>Settings</h2>
		<fieldset>
			<legend>Allowed Operations</legend>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-sum' v-model='model.allowedOperations.sum' />
				<label for='allow-sum'>Allow Sum</label>
			</div>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-difference' v-model='model.allowedOperations.difference' />
				<label for='allow-difference'>Allow Difference</label>
			</div>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-product' v-model='model.allowedOperations.product' />
				<label for='allow-product'>Allow Product</label>
			</div>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-division' v-model='model.allowedOperations.division' />
				<label for='allow-division'>Allow Division</label>
			</div>
		</fieldset>
		<div class='checkbox-group'>
			<input type='checkbox' id='allow-negatives' v-model='model.allowNegatives' />
			<label for='allow-negatives'>Allow Negatives</label>
		</div>
		<div class='checkbox-group'>
			<input type='checkbox' id='allow-decimals' v-model='model.allowDecimals' />
			<label for='allow-decimals'>Allow Decimals</label>
		</div>
		<div class='input-group' v-if='props.settings.allowDecimals'>
			<label for='decimal-places'>Decimal Places:</label>
			<input type='number' id='decimal-places' v-model='model.decimalPlaces' />
		</div>
		<div class='input-group'>
			<label for='operations-count'>Operations Count:</label>
			<input type='number' id='operations-count' v-model='model.operationsCount' />
		</div>
		<div class='input-group'>
			<label for='max-absolute-value'>Max Absolute Value:</label>
			<input type='number' id='max-absolute-value' v-model='model.maxAbsoluteValue' />
		</div>
	</div>
</template>

<style scoped>
.settings-selector {
	position: fixed;
	bottom: 20px;
	left: 20px;
	width: 300px;
	min-height: 300px;
	background-color: #6c6b6b68;
	padding: 10px;
	border-radius: 10px;
	backdrop-filter: blur(10px);
	transform: translate(-100%, 0);
	& fieldset {
		margin: 10px 0;
	}
}

.input-group {
	margin: 10px 0;
}
</style>