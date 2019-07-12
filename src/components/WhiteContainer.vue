<template>
    <div class="white-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "WhiteContainer"
}
</script>

<style scoped>
.white-container
{
    background-color: white;
    border-radius: 15px;
    animation: fadein 1s ease-in-out;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-delay: 0.6s;
}

@keyframes fadein {
    from { opacity: 0; transform: translateY(-30px)}
    to   { opacity: 1; ; transform: translateY(0px)}
}
</style>
