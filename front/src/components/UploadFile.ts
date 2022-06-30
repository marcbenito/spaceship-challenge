import { useRoutePlannerStore } from '@/stores/routePlanner';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'UploadFile',
    setup() {
        const file = ref<File | null>();
        const routePlannerStore = useRoutePlannerStore();

        function onFileChanged($event: Event) {
            routePlannerStore.file_error = false;
            const target = $event.target as HTMLInputElement;
            if (target && target.files && target.files[0] && target.files[0].name) {
                file.value = target.files[0];
                routePlannerStore.file_name = target.files[0].name;
                routePlannerStore.file = target.files[0];
                routePlannerStore.fileSelected();
            } else {
                routePlannerStore.status = 'INIT';
            }
        }

        async function saveImage() {
            if (file.value) {
                routePlannerStore.uploadFile(file.value);
            }
        }

        return {
            saveImage,
            onFileChanged
        };
    }
});
