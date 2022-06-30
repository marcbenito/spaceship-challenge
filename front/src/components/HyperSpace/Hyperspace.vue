<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { useRoutePlannerStore } from '@/stores/routePlanner';

import { HyperSpace } from './HyperSpace';
import { storeToRefs } from 'pinia';

export default {
    name: 'HyperSpace',

    setup() {
        console.log('setup..')
        const myHyperspace = new HyperSpace({
            limit: 500
        });
        const routePlannerStore = useRoutePlannerStore();
        const { getStatus } = storeToRefs(routePlannerStore);
        return {
            myHyperspace,
            getStatus
        };
    },
    components: {
        //   Typewriter
    },
    watch: {
        getStatus(newValue) {
            if (newValue === 'WAITING') {
                (this as any).myHyperspace.start();
            }
            if (newValue === 'UPLOADING') {
                (this as any).myHyperspace.jump();
            }
            if (newValue === 'ERROR') {
                setTimeout(() => {
                    (this as any).myHyperspace.slow();
                }, 1000);
                setTimeout(() => {
                    (this as any).myHyperspace.stop();
                }, 5000);
            }
            if (newValue === 'UPLOADED') {
                setTimeout(() => {
                    (this as any).myHyperspace.slow();
                }, 2100);
                setTimeout(() => {
                    (this as any).myHyperspace.stop();
                }, 7000);
            }
        }
    }
};
</script>

<template>
    <div class="wrapper"></div>
</template>
<style>
body {
    background-color: red;
}
canvas {
    position: fixed;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0px;
    z-index: -1;
}
</style>
