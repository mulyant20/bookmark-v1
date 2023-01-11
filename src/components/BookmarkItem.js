import { BiEditAlt, BiX } from 'react-icons/bi'

const BookmarksItem = ({ data, bookmark, editBookmark, deleteItem }) => {
  return (
    <div className={style.itemWrapper}>
      <a href={bookmark.link} target='_blank' rel='noreferrer'>
        {bookmark.title}
      </a>
      <div className={style.actionWrapper}>
        <div
          className={style.edit}
          onClick={() => editBookmark(bookmark, data.id)}
        >
          <BiEditAlt />
        </div>
        <div className={style.delete} onClick={() => deleteItem(bookmark.id)}>
          <BiX />
        </div>
      </div>
    </div>
  )
}

export default BookmarksItem

const style = {
  itemWrapper: 'w-full h-fit relative my-2 hover:bg-gray-100 px-4 py-2 rounded overflow-hidden bookmarkItem',
  actionWrapper: 'flex gap-1 absolute -right-10 -translate-y-1/2 top-1/2 bookmarkEdit duration-150',
  edit: 'cursor-pointer hover:text-purple-800',
  delete: 'cursor-pointer hover:text-red-500 text-[18px]',
}
