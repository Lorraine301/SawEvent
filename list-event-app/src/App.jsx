import { useState } from 'react'


import EventList from './Components/EventList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <EventList/>
    </>
  )
}

export default App
