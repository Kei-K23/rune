import { useEffect, useState } from "react";

interface IRune<T> {
  get: () => T
  set: (value: T) => void
  subscribe: (callback: (value: T) => void) => void
}

type Getter<T> = (get: <K>(r: IRune<K>) => K) => T

/**
 * Creates a new rune that wraps the given value.
 * @param value - the initial value of the rune
 * @returns a new rune that wraps the given value
 */
export function rune<T>(value: T | Getter<T> | null): IRune<T> {
  function get<K>(rune: IRune<K>): K {
    return rune.get();
  }

  // initial value
  let v: T;

  if (typeof value === "function") {
    // If `value` is an action function, execute it with a `get` function
    v = (value as Getter<T>)(get);
  } else {
    // If `value` is not a function, directly assign it to `v`
    v = value as T;
  }

  // create a new subscriber that store function
  const subscribers = new Set<(newValue: T) => void>()

  return {
    get: () => v,
    // update the value with the new value and also update the subscribers
    set: (value: T) => {
      v = value
      subscribers.forEach(callback => callback(value))
    },
    // subscribe the callback function
    subscribe: (callback: (value: T) => void) => {
      subscribers.add(callback)
    }
  }
}


/**
React hook for subscribing to a rune and keeping its value in state.
@param rune - the rune to subscribe to
@returns an array containing the current value of the rune and a setter function for updating the value
 */
export function useRune<T>(rune: IRune<T>): [T, (value: T) => void] {
  const [value, setValue] = useState(rune.get())

  useEffect(() => {
    rune.subscribe(setValue)
  }, [rune])

  return [value, rune.set]
}

export function useRuneValue<T>(rune: IRune<T>): T {
  const [value, setValue] = useState(rune.get())

  useEffect(() => {
    rune.subscribe(setValue)
  }, [rune])

  return value
}


export function useSetRune<T>(rune: IRune<T>): (value: T) => void {
  const [, setValue] = useState(rune.get())

  useEffect(() => {
    rune.subscribe(setValue)
  }, [rune])

  return rune.set
}
