<script setup lang="ts">
import HyperSpace from './components/HyperSpace/Hyperspace.vue';
</script>

<template>
    <div class="wrapper">
        <HyperSpace />
        <div class="box">
            <RouterView />
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

body,
html {
    margin: 0;
    padding: 0;
}

.panel {
    width: 100%;
    display: flex;
    min-height: 50vh;
}

.wrapper {
    max-width: 700px;
    min-height: 100vh;
    margin: auto;
    display: flex;
    align-items: center;
}

section {
    max-width: 1200px;

    margin: auto;
}

.box {
    position: relative;
    width: 100%;
    min-height: 80vh;
    margin: 40px;
    background: #060c21;
    /* Change */
    transition: 0.5s;
}

@media (max-width: 768px) {
    .box {
        margin: 8px;
    }
}

.box .imgBx {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.box .imgBx img {
    max-width: 100%;
    opacity: 0.3;
    transition: 0.5s;
}

.box:hover .imgBx img {
    opacity: 1;
}

.box:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #fff;
    z-index: -1;
}

.box:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #fff;
    z-index: -2;
    filter: blur(40px);
}

.box:before,
.box:after {
    background: linear-gradient(235deg, #2196f3, #010615, #f00000);
}

body {
    background: radial-gradient(#000, #222);
    min-height: 100vh;
    color: white;
}

@font-face {
    font-family: 'star_jediregular';
    src: url('@/assets/fonts/starjedi/starjedi-webfont.woff2') format('woff2'), url('@/assets/fonts/starjedi/starjedi-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

* {
    font-family: 'Audiowide', arial;
}
</style>
