export default {
    input: 'lib/index.js',
    output: {
        file: 'lib/index.umd.js',
        format: 'umd',
        name: 'VueClassDecorator',
        globals: {
            vue: 'Vue',
            'vue-class-component': 'VueClassComponent',
            'vue-property-decorator': 'vuePropertyDecorator',
        },
        exports: 'named',
    },
    external: ['vue', 'vue-class-component', 'vue-property-decorator', 'reflect-metadata'],
};
