interface IRune<T> {
    get: () => T;
    set: (value: T) => void;
    subscribe: (callback: (value: T) => void) => void;
}

/**
 * Creates a new rune that wraps the given value.
 * @param value - the initial value of the rune
 * @returns a new rune that wraps the given value
 */
export function runeForStorage<T>(key: string, value: T): IRune<T> {
    // Retrieve the item from localStorage
    const storedValue = localStorage.getItem(key);

    // If the item is found in localStorage, parse it, otherwise use the provided value
    let v: T = storedValue !== null ? JSON.parse(storedValue) : value;

    // Store the initial value in localStorage if it doesn't exist
    if (storedValue === null) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // create a new subscriber that stores functions
    const subscribers = new Set<(newValue: T) => void>();

    return {
        get: () => v,
        // update the value with the new value and also update the subscribers
        set: (newValue: T) => {
            v = newValue;
            subscribers.forEach((callback) => callback(newValue));
            localStorage.setItem(key, JSON.stringify(newValue));
        },
        // subscribe the callback function
        subscribe: (callback: (value: T) => void) => {
            subscribers.add(callback);
        },
    };
}
