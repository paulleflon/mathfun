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
				<input type='checkbox' id='allow-sum' value='+' v-model='model.allowedOperations' />
				<label for='allow-sum'>Allow Sum</label>
			</div>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-difference' value='-' v-model='model.allowedOperations' />
				<label for='allow-difference'>Allow Difference</label>
			</div>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-product' value='*' v-model='model.allowedOperations' />
				<label for='allow-product'>Allow Product</label>
			</div>
			<div class='checkbox-group'>
				<input type='checkbox' id='allow-division' value='/' v-model='model.allowedOperations' />
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

	& fieldset {
		margin: 10px 0;
	}
}

.input-group {
	margin: 10px 0;
}
</style>