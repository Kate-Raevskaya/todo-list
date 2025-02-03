import { downloadFile, getFile } from "../hepers/files.ts"
import type { TaskFile } from "../model/projects.types.ts"

type Props = {
  files: TaskFile[]
}

export const Files = ({ files }: Props) => {
  return (
    <div>
      {files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              <p>
                {file.name} {(file.size / 1024).toFixed(1)}Кб
              </p>
              <button
                onClick={() => {
                  getFile(file.name)
                    .then(file => downloadFile(file!))
                    .catch()
                }}
              >
                Click me
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет вложенных файлов</p>
      )}
    </div>
  )
}
