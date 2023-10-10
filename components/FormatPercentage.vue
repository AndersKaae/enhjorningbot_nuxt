<template>
    <span> {{ percentage_mutable }} %</span>
</template>

<script setup>
    const props = defineProps(["percentage"]);
    let percentage_mutable = ref(props.percentage);

    onBeforeMount(() => {
        percentage_mutable = calculateOwnership(props.percentage);
    });

    const calculateOwnership = (value) => {
    if (value == 1) {
        return '100';
    }
    if (value == 0.6667) {
        return '66.67 - 99.99';
    }
    if (value == 0.5) {
        return '50 - 66.66';
    }
    if (value == 0.3333) {
        return '33.33 - 49.99';
    }
    if (value == 0.25) {
        return '25 - 33.32';
    }
    if (value == 0.2) {
        return '20 - 24.99';
    }
    if (value == 0.15) {
        return '15 - 19.99';
    }
    if (value == 0.10) {
        return '10 - 14.99';
    }
    if (value == 0.05) {
        return '5 - 9.99';
    }
    if (value) {
        return 'Under 5';
    }
    return value;
};
</script>