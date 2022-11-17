import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BiArchiveOut, BiArchiveIn, BiEditAlt, BiX } from 'react-icons/bi'
import { UseBookmarkContext } from '../context/BookmarkContext'

export default function bookmark({ dataBookmarks }) {
  const { handlePin, handleArchive, getBookmarkDetail } = UseBookmarkContext()

  if (typeof dataBookmarks !== 'undefined' && dataBookmarks !== null) {
    return (
      <>
        {dataBookmarks.map((data) => {
          return (
            <div
              key={data.id}
              className='p-4 rounded-lg bg-white w-40 h-fit min-h-32'
            >
              <div className='flex justify-between'>
                <p>{data.value}</p>
                <div className='flex gap-2'>
                  <div
                    onClick={() => {
                      !data.hasOwnProperty('archive') ||
                      data['archive'] === true
                        ? handleArchive(data.id, 'unarchive')
                        : handleArchive(data.id, 'archive')
                    }}
                  >
                    {!data.hasOwnProperty('archive') ||
                    data['archive'] === true ? (
                      <BiArchiveOut />
                    ) : (
                      <BiArchiveIn />
                    )}
                  </div>
                  <div
                    onClick={() => {
                      !data.hasOwnProperty('pin') || data['pin'] === true
                        ? handlePin(data.id)
                        : handlePin(data.id, 'pin')
                    }}
                  >
                    {!data.hasOwnProperty('pin') || data['pin'] === true ? (
                      <AiFillStar />
                    ) : (
                      <AiOutlineStar />
                    )}
                  </div>
                </div>
              </div>

              {data.bookmarks !== null &&
                data.bookmarks.map((bookmark) => {
                  return (
                    <div key={bookmark.id} className='w-full h-fit relative'>
                      <a
                        className=''
                        href={bookmark.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {bookmark.title}
                      </a>
                      <div className='flex gap-1'>
                        <div onClick={() => getBookmarkDetail(bookmark)}>
                          <BiEditAlt />
                        </div>
                        <div>
                          <BiX />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )
        })}
      </>
    )
  }
}
