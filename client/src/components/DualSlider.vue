<template>
    <div class="range-slider">
        <span @change="slider">От <input v-model.number="currentMin" type="number" :min="minPeriod" :max="maxPeriod" /> до
            <input v-model.number="currentMax" type="number" :min="minPeriod" :max="maxPeriod" /></span>
        <input @change="slider" v-model.number="currentMin" :min="minPeriod" :max="maxPeriod" step="1" type="range" />
        <input @change="slider" v-model.number="currentMax" :min="minPeriod" :max="maxPeriod" step="1" type="range" />

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ minPeriod: number, maxPeriod: number }>();
const emit = defineEmits<{ (e: 'sliderChange', min: number, max: number): void }>()
const currentMin = ref(props.minPeriod);
const currentMax = ref(props.maxPeriod);

const slider = () => {
    if (currentMin.value > currentMax.value) {
        var tmp = currentMax.value;
        currentMax.value = currentMin.value;
        currentMin.value = tmp;
    }
    emit('sliderChange', currentMin.value, currentMax.value);
}

const onSliderClear = () => {
    currentMin.value = props.minPeriod;
    currentMax.value = props.maxPeriod;
}

defineExpose({ onSliderClear });
</script>
<style scoped>
.range-slider {
    margin: auto;
    text-align: center;
    position: relative;
    height: 4em;
}

.range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
}

input[type=number] {
    box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
    text-align: center;
    font-size: 1.2em;
    -moz-appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type=number]:invalid,
input[type=number]:out-of-range {
    border: 2px solid red;
}

input[type=range] {
    -webkit-appearance: none;
    width: 100%;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background-color: rgb(var(--v-theme-on-surface-variant));
}

input[type=range]:focus::-ms-fill-lower {
    background: #f50;
}

input[type=range]:focus::-ms-fill-upper {
    background: #f50;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    background-color: rgb(var(--v-theme-on-surface-variant));
    border-radius: 3px;
    box-shadow: none;
    border: 0;
}

input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    box-shadow: 0px 0px 0px #000;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #f50;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
}
</style>