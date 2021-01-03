import { createDecorator, Vue } from 'vue-class-component';

export function Ref(refKey?: string) {
    return createDecorator((options, propName) => {
        options.computed = options.computed || {};
        options.computed[propName] = {
            cache: false,
            get(this: Vue) {
                return this.$refs[refKey || propName];
            },
        };
    });
}
