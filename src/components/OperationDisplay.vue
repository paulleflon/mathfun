<script setup lang='ts'>
import type { InteractiveOperation } from '@/lib/Operation';
import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps<{ operation: InteractiveOperation, index: number, position: 'current' | 'previous' | 'next' }>();
const emit = defineEmits<{
	(e: 'update:answer', value: number): void;
}>();

const input = ref();

const numberInput = ref(props.operation.answer);
console.log(props.index, props.position);
const css = computed(() => {
	return {
		transform: `scale(${props.position === 'current' ? 1 : 0.3}) translateY(${props.index * 300}%)`,
	}
});

const updateNumberInput: (e: Event) => void = e => {
	if (typeof numberInput.value === 'number')
		emit('update:answer', numberInput.value);
	const target = e.target as HTMLInputElement;
	target.style.width = `${target.value.length || 1}ch`;
};
watch(
	() => props,
	(newVal, oldVal) => {
		if (newVal.operation.operands[0] !== oldVal.operation.operands[0] || newVal.operation.operands[1] !== oldVal.operation.operands[1]
			|| newVal.operation.operator !== oldVal.operation.operator) {
			numberInput.value = null;
		}
		if (newVal.position === 'current')
			input.value.focus();
	},
	{ deep: true }
);



onMounted(() => {
	if (props.position === 'current' && input.value)
		input.value.focus();
});
</script>

<template>
	<Transition>

		<div class='operation' v-if='!props.operation.correct' :style='css'>
			<div class='left-side'>
				<div class='left-operand'>{{ props.operation.operands[0] }}</div>
				<div class='operator'>{{ props.operation.operator }}</div>
				<div class='right-operand'>{{ props.operation.operands[1] }}</div>
				<div class='equals'> = </div>
			</div>

			<div class='input-container'>
				<input type='number' v-bind:disabled='props.operation.correct || props.position !== "current"'
					v-model='numberInput' @input='updateNumberInput' ref='input' />
				<div class='focus-bar'></div>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.operation {
	transition: .3s ease;
}

.left-side {
	display: inline-flex;
	margin-right: 5px;
	font: 100pt Arial;
}

.input-container {
	display: inline-block;
	position: relative;
}

input {
	width: 1ch;
	appearance: none;
	margin: 0;
	color: white;
	font-size: 100pt;
	background-color: transparent;
	outline: none;
	border: none;
	border-bottom: 1px solid white;
}

.focus-bar {
	position: absolute;
	bottom: -1px;
	left: 0;
	width: 100%;
	height: 3px;
	background-color: white;
	transform: scaleX(0);
	transition: .3s ease;
}

input:focus+.focus-bar {
	transform: scale(1);
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