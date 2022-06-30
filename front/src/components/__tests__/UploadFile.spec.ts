import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import UploadFile from '../UploadFile.vue';
import { setActivePinia, createPinia } from 'pinia';

describe('UploadFile', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it('renders properly', () => {
        const wrapper = mount(UploadFile, { props: {} });
        expect(wrapper.text()).toContain('START');
    });
});
