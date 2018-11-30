<template>
    <div class="ydt_container">
        <div class="rem-test">{{ydt_value}}</div>
        <p>123开22</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ydt_value: "52.13",
                items: []
            };
        },
        mounted() {
        },
        methods: {}
    };
</script>
<style scoped lang="scss">
    $red:red;
    $blue:blue;
    .rem-test {
        width: 100px;
        font-size: 28PX;
        color: $blue;
    }
</style>
