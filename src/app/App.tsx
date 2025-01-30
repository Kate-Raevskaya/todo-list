import { Suspense } from "react"
import { Outlet } from "react-router"

function App() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Outlet />
    </Suspense>
  )
}

export default App
