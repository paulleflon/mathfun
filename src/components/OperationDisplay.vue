<script setup lang='ts'>
import type { InteractiveOperation } from '@/lib/Operation';
import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue';
import StyledInput from './StyledInput.vue';

const props = defineProps<{ operation: InteractiveOperation, index: number, position: 'current' | 'previous' | 'next' }>();
const emit = defineEmits<{
	(e: 'update:answer', value: number): void;
}>();

const input = ref();
const timeOutRef = ref();
const inputModel = ref(String(props.operation.answer || ''));
const numberAnswer = computed(() => parseInt(inputModel.value));

const css = computed(() => {
	return {
		transform: `scale(${props.position === 'current' ? 1 : 0.3}) translateY(${props.index * 200}%)`,
		opacity: props.position === 'current' ? 1 : .2,
		filter: props.position === 'current' ? 'none' : props.position === 'next' ? 'blur(20px)' : 'blur(70px)'
	}
});

const beforeInput: (e: InputEvent) => void = e => {
	if (e.inputType.startsWith('insert')) {
		if (!/^\d|-$/.test(e.data || '')) {
			e.preventDefault();
		}
		else if (e.data === '-' && inputModel.value !== '') {
			e.preventDefault();
		}
	}
};

const onInput = () => {
	clearTimeout(timeOutRef.value);
	timeOutRef.value = setTimeout(() => {
		emit('update:answer', numberAnswer.value);
	}, 100)
}

watch(
	() => props.operation,
	(newVal, oldVal) => {
		if (newVal.operands[0] !== oldVal.operands[0] || newVal.operands[1] !== oldVal.operands[1]
			|| newVal.operator !== oldVal.operator) {
			inputModel.value = '';
		}
	},
	{ deep: true }
);

watch(
	() => props.position,
	(newVal) => {
		if (newVal === 'current') {
			input.value.focus();
		}
	}
);



onMounted(() => {
	if (props.position === 'current' && input.value)
		input.value.focus();
});
</script>

<template>
	<div class='operation' :style='css'>
		<div class='left-side'>
			<div class='left-operand'>{{ props.operation.operands[0] }}</div>
			<div class='operator'>{{ props.operation.operator === '*' ? '×' : props.operation.operator }}</div>
			<div class='right-operand'>{{ props.operation.operands[1] }}</div>
			<div class='equals'> = </div>
		</div>
		<StyledInput v-model='inputModel' @input='onInput' @beforeinput='beforeInput' ref='input' />
	</div>
</template>

<style scoped>
.operation {
	transition: .4s ease;
	font-family: 'Bluu Next', serif;
}

@media (prefers-reduced-motion) {
	.operation {
		transition: all 0s linear .1s;
		/* Lets the user see their final input before it goes away */
	}
}

.left-side {
	display: inline-flex;
	margin-right: 5px;
	font-size: 100pt;
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
	font: 600 100pt 'Fira', sans-serif;
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