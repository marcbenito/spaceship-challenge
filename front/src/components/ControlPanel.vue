<script setup lang="ts"></script>

<template>
    <div class="main-box">
        <div class="monitor-box"></div>
        <div class="control-box">
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<style scoped>
.monitor-box {
    width: 100%;
    height: 50%;
    background-color: red;
    border: 10px solid green;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.control-box {
    background-color: blue;
    width: 100%;
    height: 50%;
}
.main-box {
    max-width: 1200px;
    width: 100%;
    height: 50vh;
    display: flex;
    flex-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
