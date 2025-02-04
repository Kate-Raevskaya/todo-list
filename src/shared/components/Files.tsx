import type { TaskFile } from "../model/projects.types.ts"
import { FileCard } from "./FileCard.tsx"
import cls from "./Files.module.sass"

type Props = {
  files: TaskFile[]
}

export const Files = ({ files }: Props) => {
  return (
    <div className={cls.container}>
      {files.length > 0 ? (
        files.map(file => <FileCard file={file} key={file.id} />)
      ) : (
        <p className={cls.emptyFiles}>Нет вложенных файлов</p>
      )}
    </div>
  )
}
