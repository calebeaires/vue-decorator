import { WatchOptions } from 'vue';
import { createDecorator } from 'vue-class-component';

export function Watch(path: string, options: WatchOptions = {}) {
    const { deep = false, immediate = false } = options;

    return createDecorator((componentOptions, handler) => {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }

        const watch: any = componentOptions.watch;

        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        } else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }

        watch[path].push({ handler, deep, immediate });
    });
}
