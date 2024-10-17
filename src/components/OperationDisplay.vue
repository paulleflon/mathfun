<script setup lang='ts'>
import type { InteractiveOperation } from '@/lib/Operation';
import { defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps<{ operation: InteractiveOperation }>();

const emit = defineEmits<{
	(e: 'update:answer', value: number): void;
}>();

const numberInput = ref(props.operation.answer);

const updateNumberInput = () => {
	if (typeof numberInput.value === 'number')
		emit('update:answer', numberInput.value);
	console.log(props.operation, numberInput.value);
};

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
	<Transition>

		<div class='operation' v-if='!props.operation.correct'>
			<div class='left-side'>
				<div class='left-operand'>{{ props.operation.operands[0] }}</div>
				<div class='operator'>{{ props.operation.operator }}</div>
				<div class='right-operand'>{{ props.operation.operands[1] }}</div>
				<div class='equals'> = </div>
			</div>
			<input type='number' v-bind:disabled='props.operation.correct' v-model='numberInput'
				@input='updateNumberInput' />
		</div>
	</Transition>
</template>

<style scoped>
.operation {
	margin: 20px;
	display: flex;
}

.left-side {
	display: flex;
	margin-right: 5px;
	font: 50pt Arial;
}

input {
	display: inline-block;
	width: 100px;
	appearance: none;
	margin: 0;
	color: white;
	font: 50pt Arial;
	background-color: transparent;
	outline: none;
	border: none;
	border-bottom: 1px solid white;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}


.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	transform: scale(1.6);
	filter: blur(50px);
	opacity: 0;
}
</style>