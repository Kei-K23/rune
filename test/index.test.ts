import { rune } from "../src/index"

describe("rune", () => {
    it("should create a new rune", () => {
        const testRune = rune(1);
        expect(testRune.get()).toEqual(1);
    });
});

describe("rune", () => {
    it("should update rune value", () => {
        const testRune = rune(1);
        testRune.set(2)
        expect(testRune.get()).toEqual(2);
    });
});

describe("rune", () => {
    it("should defined rune value by other rune value", () => {
        const run1 = rune(1);
        const run2 = rune(2);
        const run3 = rune((get) => get(run1) + get(run2));
        expect(run3.get()).toEqual(3);
    });
});

