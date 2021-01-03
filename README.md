# vue-class-decorator

Custom decorators to vue-class-component that fits Vue 3, heavily inspired
by [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

## Help need: yes
##Compatible: Vue 3

## License

MIT License

## Install

### yarn

```bash
yarn add vue-decorator
```

### npm

```bash
npm i vue-decorator
```

## Usage

- [`@Prop`](#Prop)
- [`@Watch`](#Watch)

### <a id="Prop"></a> `@Prop(options: (PropOptions | VueConstructor[] | VueConstructor) = {})`

```ts
import {Vue, Options, Prop} from 'vue-decorator'

@Options({})
export default class YourComponent extends Vue {
    @Prop(Number) readonly propA: number | undefined
    @Prop({default: 'default value'}) readonly propB!: string
    @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

is equivalent to

```js
export default {
    props: {
        propA: {
            type: Number,
        },
        propB: {
            default: 'default value',
        },
        propC: {
            type: [String, Boolean],
        },
    },
}
```

### <a id="Watch"></a> `@Watch(path: string, options: WatchOptions = {})`

```ts
import {Vue, Options, Watch} from 'vue-decorator'

@Options({})
export default class YourComponent extends Vue {
    @Watch('child')
    onChildChanged(val: string, oldVal: string) {
    }

    @Watch('person', {immediate: true, deep: true})
    onPersonChanged1(val: Person, oldVal: Person) {
    }

    @Watch('person')
    onPersonChanged2(val: Person, oldVal: Person) {
    }
}
```

is equivalent to

```js
export default {
    name: 'MyComponent',
    watch: {
        child: [
            {
                handler: 'onChildChanged',
                immediate: false,
                deep: false,
            },
        ],
        person: [
            {
                handler: 'onPersonChanged1',
                immediate: true,
                deep: true,
            },
            {
                handler: 'onPersonChanged2',
                immediate: false,
                deep: false,
            },
        ],
    },
    methods: {
        onChildChanged(val, oldVal) {
        },
        onPersonChanged1(val, oldVal) {
        },
        onPersonChanged2(val, oldVal) {
        },
    },
}
```

