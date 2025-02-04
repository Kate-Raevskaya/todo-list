import okay from "../images/okay.svg"
import cls from "./AddButton.module.sass"

type Props = {
  title: string
}

export const AddButton = ({ title }: Props) => {
  return (
    <button className={cls.addButton} type="submit">
      {title}
      <img src={okay} className={cls.image} alt="add" />
    </button>
  )
}
