import { uploadFile } from '@/services/upload.service';
import { defineStore } from 'pinia';

export interface RoutePlannerState {
    file: File | null;

    file_error: boolean;
    status: string;
    odds: number | null;
    journey: [] | null;
    file_name: string;
}

export const useRoutePlannerStore = defineStore({
    id: 'routePlanner',
    state: () =>
        ({
            file: null,
            status: 'INIT',
            file_name: '',
            odds: null,
            journey: null
        } as RoutePlannerState),
    getters: {
        getStatus(state) {
            return state.status;
        }
    },
    actions: {
        async fileSelected() {
            this.status = 'WAITING';
            this.odds = null;
            this.journey = null;
        },
        async uploadFile(file: File) {
            try {
                this.odds = null;
                this.status = 'UPLOADING';
                const res = await uploadFile(file);
                this.status = 'UPLOADED';
                this.odds = res.data.odds;
                this.journey = res.data.routes;
            } catch (error) {
                this.status = 'ERROR';
                console.error(error);
            }
        }
    }
});
