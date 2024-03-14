# Rune (Small React State Management Library)

Rune is small and simple React State Management Library inspired from Jotai. This is initially build for practical purpose how react state management library work under the hook and hopefully compatible for some hobby React projects. But further improvements this library can be used in production build React applications.

## Installation

You can install the library via npm:

```bash
npm i react-runejs
```

## Usage

### Basic Usage

```bash
import { rune, useRune } from "react-runejs";

// Create a reactive state
const countRune = rune(0);

// Use the reactive state in a component
function Counter() {
  const [count, setCount] = useRune(countRune);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### Persistence with Local Storage

```bash
import { runeForStorage, useRune } from "react-runejs";

// Create a reactive state persisted in local storage
const themeRune = runeForStorage("theme", "light");

// Use the reactive state in a component
function ThemeToggle() {
  const [theme, setTheme] = useRune(themeRune);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <span>Current Theme: {theme}</span>
    </div>
  );
}
```

## API Reference

`rune(value: T | Getter<T>): IRune<T>`
Creates a reactive state with the given value or a getter function.

- `value`: Initial value of the reactive state or a getter function to compute the initial value.

`runeForStorage<T>(key: string, value: T): IRune<T>`
Creates a reactive state persisted in local storage.

- `key`: Key for storing the value in local storage.
- `value`: Initial value of the reactive state.

`useRune<T>(rune: IRune<T>): [T, (value: T) => void]`
React hook for subscribing to a reactive state and keeping its value in state.

- `rune`: Reactive state to subscribe to.
- Returns an array containing the current value of the reactive state and a setter function for updating the value.

`useRuneValue<T>(rune: IRune<T>): T`
React hook for subscribing to a reactive state and returning its current value.

- `rune`: Reactive state to subscribe to.
- Returns the current value of the reactive state.

`useSetRune<T>(rune: IRune<T>): (value: T) => void`
React hook for subscribing to a reactive state and returning a setter function for updating the value.

- `rune`: Reactive state to subscribe to.
- Returns a setter function for updating the value of the reactive state.
