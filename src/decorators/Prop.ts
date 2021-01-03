import {
    createDecorator,
    PropOptions,
    Vue,
    VueConstructor,
} from 'vue-class-component';

export function Prop(
    options: PropOptions | VueConstructor[] | VueConstructor = {},
) {
    return (target: Vue, key: string) => {
        createDecorator((componentOptions, propName) => {
            (componentOptions.props || ((componentOptions.props = {}) as any))[
                propName
            ] = options;
        })(target, key);
    };
}
