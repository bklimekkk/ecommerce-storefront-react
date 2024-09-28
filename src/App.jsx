import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StoreElement from './StoreElement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <StoreElement />
  );
}

export default App
