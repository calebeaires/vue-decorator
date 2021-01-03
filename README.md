# vue-class-decorator

Custom decorators to vue-class-component that fits Vue 3, heavily inspired
by [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

---
## Help need: yes
##Compatible: Vue 3
---

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
- [`@Ref`](#Ref)

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

### <a id="Emit"></a> `@Emit(event?: string)` decorator

The functions decorated by `@Emit` `$emit` their return value followed by their original arguments. If the return value is a promise, it is resolved before being emitted.

If the name of the event is not supplied via the `event` argument, the function name is used instead. In that case, the camelCase name will be converted to kebab-case.

```ts
import { Vue, Options, Emit } from 'vue-decorator'

@Options({})
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  onInputChange(e) {
    return e.target.value
  }

  @Emit()
  promise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

is equivalent to

```js
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    },
    promise() {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then((value) => {
        this.$emit('promise', value)
      })
    },
  },
}
```


### <a id="Ref"></a> `@Ref(refKey?: string)`

```ts
import { Vue, Options, Ref } from 'vue-decorator'

@Options({})
export default class YourComponent extends Vue {
  @Ref('aButton') readonly button!: HTMLButtonElement
}
```

is equivalent to

```js
export default {
  computed() {
    button: {
      cache: false,
      get() {
        return this.$refs.aButton as HTMLButtonElement
      }
    }
  }
}
```

