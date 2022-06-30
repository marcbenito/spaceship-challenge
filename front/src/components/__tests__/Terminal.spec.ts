import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import Terminal from '../Terminal.vue';
import { setActivePinia, createPinia } from 'pinia';

describe('Terminal', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it('renders properly', () => {
        const wrapper = mount(Terminal, { props: {} });
        expect(wrapper.text()).toContain('Please upload the file ..');
    });
});
