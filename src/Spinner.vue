<template>
    <div class="loader"></div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .loader {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #c4c5d6;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
        margin-left: 40%;
        margin-top: 18%;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>