import { UseBookmarkContext } from '../context/BookmarkContext'
import BookmarksItem from './BookmarkItem'
import BookmarkHead from './BookmarkHead'

export default function bookmark({ dataBookmarks }) {
  const {
    isOpen,
    handlePopup,
    handlePin,
    handleArchive,
    getBookmarkDetail,
    setType,
    setCategory,
    deleteItem,
  } = UseBookmarkContext()

  const editBookmark = (payload, id) => {
    getBookmarkDetail(payload)
    setType('EDIT')
    setCategory(id)
  }

  const handleAdd = (category) => {
    if (!isOpen) {
      setType('SAVE')
      setCategory(category)
      handlePopup()
    }
  }

  if (typeof dataBookmarks !== 'undefined' && dataBookmarks !== null) {
    return (
      <>
        {dataBookmarks.map((data) => {
          return (
            <div
              key={data.id}
              className={style.bookmarkWrapper}
            >
              <BookmarkHead
                data={data}
                handleArchive={handleArchive}
                handlePin={handlePin}
                handleAdd={handleAdd}
              />

              <div
                className={
                  data.bookmarks !== null && data.bookmarks.length > 6
                    ? style.bookmarksLong
                    : style.bookmarksDefault
                }
              >
                {data.bookmarks !== null &&
                  data.bookmarks.map((bookmark) => (
                    <BookmarksItem
                      data={data}
                      bookmark={bookmark}
                      editBookmark={editBookmark}
                      deleteItem={deleteItem}
                    />
                  ))}
                {data.bookmarks === null && (
                  <p className='text-center text-gray-300 py-2'>Empty</p>
                )}
              </div>
            </div>
          )
        })}
      </>
    )
  }
}

const style = {
  bookmarksLong: 'h-fit max-h-80 w-full pl-4 pr-2 pb-4 overflow-auto custom-scroll',
  bookmarksDefault: 'h-fit max-h-80 w-full px-4 pb-4 overflow-auto custom-scroll',
  bookmarkWrapper: 'rounded-lg bg-white h-fit border border-gray-200/70 relative'
}
