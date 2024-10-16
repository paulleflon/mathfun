<script setup lang='ts'>
import type { InteractiveOperation } from '@/lib/Operation';
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps<{ operation: InteractiveOperation }>();

const emit = defineEmits<{
	(e: 'update:answer', value: number): void;
}>();

const numberInput = ref(props.operation.answer);

const updateNumberInput = () => {
	if (numberInput.value)
		emit('update:answer', numberInput.value);
};
import { watch } from 'vue';

watch(
	() => props.operation,
	(newVal, oldVal) => {
		if (newVal.operands[0] !== oldVal.operands[0] || newVal.operands[1] !== oldVal.operands[1] || newVal.operator !== oldVal.operator) {
			numberInput.value = null;
		}
	},
	{ deep: true }
);
</script>

<template>

	<div class='operation'>
		<div class='left-side'>
			<div class='left-operand'>{{ props.operation.operands[0] }}</div>
			<div class='operator'>{{ props.operation.operator }}</div>
			<div class='right-operand'>{{ props.operation.operands[1] }}</div>
		</div>
		<div class='equals'> = </div>
		<input type='number' v-bind:disabled='props.operation.correct' v-model='numberInput'
			@input='updateNumberInput' />
	</div>
</template>

<style scoped>
.operation {
	display: flex;
	margin: 20px;
}

.left-side {
	display: flex;
	margin-right: 5px;
}

input {
	width: 50px;
}

template {
	margin: 10px;
}
</style>