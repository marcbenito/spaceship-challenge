<template>
    <section class="upload_file">
        <input class="button-upload" type="file" @change="onFileChanged($event)" accept="application/JSON" capture />
        <button @click="saveImage()" class="button-start">START</button>
    </section>
</template>
<script src="./UploadFile.ts" lang="ts"></script>

<style scoped>
@media (max-width: 768px) {
    .upload_file {
        padding: 16px;
    }
}
.upload_file {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
}

.button-start {
    font-family: 'star_jediregular';
    font-size: 60px;
    text-align: center;
    line-height: 1;
    background-color: transparent;
    cursor: pointer;
    color: #ffe81f;
    border: none;
    margin-bottom: 40px;
}

.button-start:hover {
    opacity: 0.6;
}

.button-upload {
    width: 100%;
    height: 100px;
}

.start_button:hover {
    color: #ffe81f;
}
</style>
