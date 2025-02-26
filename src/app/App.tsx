import { registerPlugin } from "filepond"
import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import { Suspense, useEffect } from "react"
import { Outlet } from "react-router"

import { getAllProjects } from "../shared/api/projects.ts"
import { useAppDispatch } from "../shared/hooks/store-hooks.ts"
import { initializeProjects } from "../store/projectsSlice.ts"

registerPlugin(FilePondPluginFileEncode)

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeProjects(getAllProjects()))
  }, [])

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Outlet />
    </Suspense>
  )
}

export default App
