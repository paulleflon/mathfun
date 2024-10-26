<template>
	<div @click='focus' class='input-wrapper'>
		<TransitionGroup name='characters' tag='div' class='input-display'>
			<div v-for='char in model!' :key='char'>{{ char }}</div>
		</TransitionGroup>
		<input type='text' @keydown='onKeydown' @input='onInput' @beforeinput='onBeforeInput' v-model='model'
			ref='hiddenInput' class='hidden-input' />
		<div class='input-border' :style='borderWidth'></div>
	</div>
</template>

<script setup lang='ts'>
import { computed, defineExpose, ref } from 'vue';
const model = defineModel<string>();
const hiddenInput = ref();
const emit = defineEmits(['input', 'beforeInput']);

const borderWidth = computed<{width: string}>(function(old) {
	if (textWidth.value)
		return {
			width: `${textWidth.value}px`
		}
	else return old as {width: string};
});
const focus = () => {
	hiddenInput.value.focus();
};
defineExpose({ focus });

const onInput = (e: Event): void => {
	emit('input', e);
};
const onBeforeInput = (e: Event): void => {
	emit('beforeInput', e);
};
const onKeydown = (e: KeyboardEvent): void => {
	const { key } = e;
	if (key.startsWith('Arrow') || key === 'Home' || key === 'End' || key === 'PageUp' || key === 'PageDown') {
		e.preventDefault();
	}
	if ((e.ctrlKey || e.metaKey) && key === 'Backspace') {
		e.preventDefault();
		model.value = model.value?.slice(0, 1);
		setTimeout(() => {
			model.value = ''
			model.value = undefined;
		}, 1);
	}
}


const textWidth = computed(() => {
	try {
		const input = hiddenInput.value;
		const text = model.value + '';
		const font = window.getComputedStyle(input).font;
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (!context) return;
		context.font = font;
		if (text) {
			console.log(context.measureText(text).width);
			return context.measureText(text).width;
		}
		else
			return null;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return null;
	}
});

</script>

<style scoped>
.input-wrapper {
	font: 100pt 'Bluu Next', serif;
	cursor: text;
	display: inline-block;
	position: relative;
}

.input-display {
	min-width: 100px;
	display: inline-block;
}

.input-display div {
	display: inline-block;
}

.input-border {
	position: absolute;
	height: 1px;
	width: 1ch;
	background-color: #fff;
	transition: width .3s ease;
	bottom: 0;
}

.hidden-input {
	top: 0;
	left: 0;
	position: absolute;
	opacity: 0;
	width: 0;
	pointer-events: none;
	font: 100pt 'Bluu Next';
}

input:focus+.input-border {
	height: 2px;
}

.characters-enter-active {
	transition: opacity .1s ease, filter .2s ease, transform .3s ease;
}

.characters-leave-active {
	transition: opacity .4s ease, filter .4s ease, transform .2s ease;
}

.characters-enter-from,
.characters-leave-to {
	opacity: 0;
	filter: blur(30px);
	transform: translateY(-15px);
}
</style>