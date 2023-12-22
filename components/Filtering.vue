<template>
    <div class="container">
        <div class="button" @click="toggleOptionsBox">
            <font-awesome-icon class="icon" icon="fa-solid fa-filter" />
        </div>
        <div class="options-box" v-show="isOptionsBoxVisible">
            <p>Include:</p>
            <div class="check-item">
                <input 
                    type="checkbox" 
                    id="holding" 
                    :checked="checkboxValues.holdingCompany" 
                    @change="updateValue('holdingCompany', $event.target.checked)"
                />
                <label for="holding">Holding companies</label>
            </div>
            <div class="check-item">
                <input 
                    type="checkbox" 
                    id="realestate"
                    :checked="checkboxValues.realestate" 
                    @change="updateValue('realestate', $event.target.checked)"
                />
                <label for="realestate">Real Estate</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  checkboxValues: Object
});
const emit = defineEmits(['update:checkboxValues']);

const isOptionsBoxVisible = ref(false);

function toggleOptionsBox() {
    isOptionsBoxVisible.value = !isOptionsBoxVisible.value;
}

function updateValue(key, value) {
    // Emit an event to update the parent state
    emit('update:checkboxValues', { ...props.checkboxValues, [key]: value });
}
</script>

<style scoped>
.container {
    position: relative;
    display: inline-block;
    position: relative;
    margin-right: -8px;
}

.button {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin: 0 0.5em 0.5em;
    padding: 0.5em 1em;
    text-align: center;
    text-decoration: none;
    transition: all 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
}

.icon {
    margin-top: 3px;
    font-size: 1.2rem;
    margin-bottom: -3px;
}

.options-box {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 0.2em 0.5em;
    padding: 0.5em 1em;
    text-align: left;
    text-decoration: none;
    transition: all 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    width: 200px;
}

.check-item {
    margin: 0.5em 0;
}

</style>