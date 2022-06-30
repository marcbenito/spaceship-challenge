<script lang="ts">
import { useRoutePlannerStore } from '@/stores/routePlanner';

//import Typewriter from "typewriter-vue";

export default {
    name: 'TernimalComponent',
    setup() {
        const routePlannerStore = useRoutePlannerStore();
        return {
            routePlannerStore
        };
    }
};
</script>

<template>
    <section class="screen">
        <div class="terminal_emulator">
            <div class="content">
                <p v-if="routePlannerStore.status == 'INIT'">Please upload the file ..<span class="caret">|</span></p>
                <p v-else-if="routePlannerStore.status === 'ERROR'">Error sending the file.. <span class="caret">|</span></p>
                <p v-else-if="routePlannerStore.status === 'WAITING'">Press Start to process...<span class="caret">|</span></p>
                <p v-else-if="routePlannerStore.status === 'UPLOADED'">The odds are {{ routePlannerStore.odds }}<span class="caret">|</span></p>
                <p v-else-if="routePlannerStore.status === 'UPLOADING'">Uploading and processing please wait..<span class="caret">|</span></p>
                <div v-if="routePlannerStore.status === 'UPLOADED' && routePlannerStore.journey && routePlannerStore.journey.length > 0">
                    <li v-for="step in routePlannerStore.journey" v-bind:key="step" v-bind:step="step">
                        <span v-if="step.fromPlanet"> Travel from {{ step.fromPlanet }} to {{ step.toPlanet }} </span>
                        <span v-if="step.refuel"> Refuel on {{ step.planet }} </span>
                        <span v-if="step.wait"> Wait for 1 day on {{ step.planet }} </span>
                    </li>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.screen {
    width: 100%;
}

@media (max-width: 768px) {
    .terminal_emulator {
        margin: 16px;
    }
}

.terminal_emulator {
    min-height: 200px;
    background-color: black;
    margin: 40px;
}

.content {
    text-align: left;
    padding: 20px;
    overflow-x: hidden;
    max-width: 100%;
}

.terminal_emulator .content p,
.terminal_emulator .content li span {
    font-family: 'Courier';
    font-size: 14px;
    margin: 10px 0 0 10px;
    white-space: nowrap;
    overflow: hidden;
    width: 255px;
    animation: type 4s steps(30, end);
}

@media (min-width: 769px) {
    .terminal_emulator .content p,
    .terminal_emulator .content li span {
        font-family: 'Courier';
        font-size: 16px;
        margin: 10px 0 0 10px;
        white-space: nowrap;
        overflow: hidden;
        width: 287px;
        animation: type 4s steps(30, end);
    }
}

.terminal_emulator .content p :nth-child(1) {
    animation: type2 4s steps(60, end);
}

.terminal_emulator .content p li:nth-child(1) {
    animation: type2 8s steps(60, end);
}

.terminal_emulator .content p li:nth-child(2) {
    animation: type2 16s steps(60, end);
}

span.caret {
    animation: blink 1s infinite;
}

@keyframes type {
    from {
        width: 0;
    }
}

@keyframes type2 {
    0% {
        width: 0;
    }

    50% {
        width: 0;
    }

    100% {
        width: 100;
    }
}

@keyframes blink {
    to {
        opacity: 0;
    }
}

::selection {
    background: black;
}
</style>
