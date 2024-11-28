export const codeSnippets = [
  // Basic functional component
  `import { h } from 'preact';
  
  const App = () => {
    return <h1>Hello, Preact!</h1>;
  };
  
  export default App;`,

  // Component with props
  `import { h } from 'preact';
  
  interface GreetingProps {
    name: string;
  }
  
  const Greeting = ({ name }: GreetingProps) => {
    return <p>Hello, {name}!</p>;
  };
  
  export default Greeting;`,

  // Using useState for state management
  `import { h } from 'preact';
  import { useState } from 'preact/hooks';
  
  const Counter = () => {
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  };
  
  export default Counter;`,

  // Event handling
  `import { h } from 'preact';
  
  const ClickHandler = () => {
    const handleClick = () => {
      alert('Button clicked!');
    };
  
    return <button onClick={handleClick}>Click me</button>;
  };
  
  export default ClickHandler;`,

  // Using useEffect for lifecycle methods
  `import { h } from 'preact';
  import { useEffect, useState } from 'preact/hooks';
  
  const Timer = () => {
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    return <p>Time: {time}s</p>;
  };
  
  export default Timer;`,

  // Custom hook example
  `import { useState } from 'preact/hooks';
  
  const useToggle = (initialValue: boolean = false) => {
    const [state, setState] = useState(initialValue);
    const toggle = () => setState((prev) => !prev);
    return [state, toggle] as const;
  };
  
  export default useToggle;`,

  // Using refs to access DOM elements
  `import { h } from 'preact';
  import { useRef } from 'preact/hooks';
  
  const InputFocus = () => {
    const inputRef = useRef<HTMLInputElement>(null);
  
    const focusInput = () => {
      inputRef.current?.focus();
    };
  
    return (
      <div>
        <input ref={inputRef} type="text" placeholder="Type something..." />
        <button onClick={focusInput}>Focus Input</button>
      </div>
    );
  };
  
  export default InputFocus;`,

  // Component with children
  `import { h, ComponentChildren } from 'preact';
  
  interface CardProps {
    title: string;
    children: ComponentChildren;
  }
  
  const Card = ({ title, children }: CardProps) => {
    return (
      <div className="card">
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    );
  };
  
  export default Card;`,

  // Fetch data with useEffect
  `import { h } from 'preact';
  import { useEffect, useState } from 'preact/hooks';
  
  const FetchData = () => {
    const [data, setData] = useState<string | null>(null);
  
    useEffect(() => {
      fetch('https://api.example.com/data')
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
  
    return <p>{data || 'Loading...'}</p>;
  };
  
  export default FetchData;`,

  // Controlled input component
  `import { h } from 'preact';
  import { useState } from 'preact/hooks';
  
  const ControlledInput = () => {
    const [value, setValue] = useState('');
  
    return (
      <div>
        <input
          type="text"
          value={value}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
        />
        <p>Input: {value}</p>
      </div>
    );
  };
  
  export default ControlledInput;`,

  // Context API usage
  `import { h, createContext } from 'preact';
  import { useContext } from 'preact/hooks';
  
  const ThemeContext = createContext('light');
  
  const ThemedComponent = () => {
    const theme = useContext(ThemeContext);
    return <p>Current theme: {theme}</p>;
  };
  
  const App = () => {
    return (
      <ThemeContext.Provider value="dark">
        <ThemedComponent />
      </ThemeContext.Provider>
    );
  };
  
  export default App;`,

  // Memoizing expensive calculations
  `import { h } from 'preact';
  import { useMemo, useState } from 'preact/hooks';
  
  const ExpensiveCalculation = () => {
    const [count, setCount] = useState(0);
  
    const expensiveValue = useMemo(() => {
      let total = 0;
      for (let i = 0; i < 1e7; i++) {
        total += i;
      }
      return total + count;
    }, [count]);
  
    return (
      <div>
        <p>Calculated Value: {expensiveValue}</p>
        <button onClick={() => setCount(count + 1)}>Recalculate</button>
      </div>
    );
  };
  
  export default ExpensiveCalculation;`,

  // Fragment example
  `import { h, Fragment } from 'preact';
  
  const FragmentExample = () => {
    return (
      <>
        <p>This is a fragment.</p>
        <p>Fragments allow grouping without extra DOM elements.</p>
      </>
    );
  };
  
  export default FragmentExample;`,

  // Error boundary
  `import { h, Component } from 'preact';
  
  class ErrorBoundary extends Component {
    state = { hasError: false };
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;`,

  // CSS-in-JS example
  `import { h } from 'preact';
  
  const styles = {
    container: {
      padding: '10px',
      backgroundColor: '#282c34',
      color: 'white',
    },
  };
  
  const StyledComponent = () => {
    return <div style={styles.container}>This is a styled component!</div>;
  };
  
  export default StyledComponent;`,
];
