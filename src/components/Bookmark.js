import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BiArchiveOut, BiArchiveIn, BiEditAlt, BiX } from 'react-icons/bi'
import { UseBookmarkContext } from '../context/BookmarkContext'

export default function bookmark({ dataBookmarks }) {
  const {
    isOpen,
    handlePopup,
    handlePin,
    handleArchive,
    getBookmarkDetail,
    setType,
    setCategory,
    deleteItem
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
              className='p-4 rounded-lg bg-white h-fit min-h-32 border border-gray-200/70'
            >
              <div className='flex justify-between items-center mb-2'>
                <p className='text-gray-600 font-semibold'>{data.value}</p>
                <div className='flex gap-2'>
                  <div
                  className='p-2 hover:bg-gray-100/80 rounded text-gray-400 hover:text-gray-800 flex items-center justify-center cursor-pointer'
                    onClick={() => {
                      data['archive'] === true
                        ? handleArchive(data.id, 'unarchive')
                        : handleArchive(data.id, 'archive')
                    }}
                  >
                    {data['archive'] === true ? (
                      <BiArchiveOut />
                    ) : (
                      <BiArchiveIn />
                    )}
                  </div>
                  <div
                  className='p-2 hover:bg-gray-100/80 rounded text-yellow-300 hover:text-yellow-500 flex items-center justify-center cursor-pointer'
                    onClick={() => {
                      data['pin'] === true
                        ? handlePin(data.id)
                        : handlePin(data.id, 'pin')
                    }}
                  >
                    {data['pin'] === true ? <AiFillStar /> : <AiOutlineStar />}
                  </div>
                </div>
              </div>

              {data.bookmarks !== null &&
                data.bookmarks.map((bookmark) => {
                  return (
                    <div key={bookmark.id} className='w-full h-fit relative my-2 hover:bg-gray-100 px-4 py-2 rounded overflow-hidden bookmarkItem'>
                      <a
                        className=''
                        href={bookmark.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {bookmark.title}
                      </a>
                      <div className='flex gap-1 absolute -right-10 -translate-y-1/2 top-1/2 bookmarkEdit duration-150'>
                        <div className='cursor-pointer hover:text-purple-800' onClick={() => editBookmark(bookmark, data.id)}>
                          <BiEditAlt />
                        </div>
                        <div className='cursor-pointer hover:text-red-500 text-[18px]' onClick={() => deleteItem(bookmark.id)}>
                          <BiX />
                        </div>
                      </div>
                    </div>
                  )
                })}
              <button
                className='w-full bg-gray-100 mt-2 rounded py-[4px]'
                onClick={() => handleAdd(data.id)}
              >
                Tambah
              </button>
            </div>
          )
        })}
      </>
    )
  }
}
