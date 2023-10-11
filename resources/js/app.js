import './bootstrap';
import '../css/app.css';
import './Layouts/GuestLayout.vue';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
//@ts-expect-error
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {VueFileAgentNext} from "@boindil/vue-file-agent-next";
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
        `./Pages/${name}.vue`,
        import.meta.glob('./Pages/**/*.vue')
    ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(VueFileAgentNext)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
