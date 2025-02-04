import { downloadFile, getFile } from "../hepers/files.ts"
import download from "../images/download.svg"
import type { TaskFile } from "../model/projects.types.ts"
import cls from "./FileCard.module.sass"

type Props = {
  file: TaskFile
}
export const FileCard = ({ file }: Props) => {
  return (
    <div className={cls.container}>
      <div
        className={cls.downloadImage}
        onClick={() => {
          getFile(file.id)
            .then(file => downloadFile(file!))
            .catch()
        }}
      >
        <img src={download} alt="load" />
      </div>
      <div className={cls.fileDesc}>
        <p className={cls.name}>{file.name}</p>
        <p className={cls.size}>{(file.size / 1024).toFixed(1)} Кб</p>
      </div>
    </div>
  )
}
