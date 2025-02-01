// import cls from "../../features/tasks/ui/TaskCard/TaskFullInfo.module.sass"
// import type { Comment } from "../model/projects.types.ts"
//
// type Props = {
//   comments: Comment[]
// }
//
// export const Comments = ({ comments }: Props) => {
//   return comments.length > 0 ? (
//     <div className={cls.comments}>
//       {comments.map(comment => (
//         <div key={comment.id} className={cls.comment}>
//           <p>
//             <span>{comment.author}</span> ({comment.date}):
//           </p>
//           <p>{comment.text}</p>
//           {comment.replies.length > 0 && (
//             <div className={cls.replies}>
//               {<Comments comments={comment.replies} />}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p>Нет комментариев</p>
//   )
// }
