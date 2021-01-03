import { Vue } from 'vue-class-component';

export function Emit(event?: string) {
    const hyphenate = (str: string) =>
        str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

    const isPromise = (obj: any): obj is Promise<any> => {
        return (
            obj instanceof Promise || (obj && typeof obj.then === 'function')
        );
    };

    return function (_target: Vue, propertyKey: string, descriptor: any) {
        const key = hyphenate(propertyKey);
        const original = descriptor.value;
        descriptor.value = function emitter(...args: any[]) {
            const emit = (returnValue: any) => {
                const emitName = event || key;

                if (returnValue === undefined) {
                    if (args.length === 0) {
                        this.$emit(emitName);
                    } else if (args.length === 1) {
                        this.$emit(emitName, args[0]);
                    } else {
                        this.$emit(emitName, ...args);
                    }
                } else {
                    args.unshift(returnValue);
                    this.$emit(emitName, ...args);
                }
            };

            const returnValue: any = original.apply(this, args);

            if (isPromise(returnValue)) {
                returnValue.then(emit);
            } else {
                emit(returnValue);
            }

            return returnValue;
        };
    };
}
