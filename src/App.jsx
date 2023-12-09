import { useState } from 'react'
import Header from './components/Header.jsx'
import MyFormData from './components/MyFormData'
import PostsList from './components/PostsList'
import style from "./css/modules/Main.module.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />

      <main className={`container-fluid`}>
        <MyFormData />
        <PostsList />
      </main>
    </>
  )
}

export default App
