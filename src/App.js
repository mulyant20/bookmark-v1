import { useEffect, useMemo, useState } from 'react'
import { getLocal } from './utils/localstorage'
import Bookmark from './components/Bookmark'
import { UseBookmarkContext } from './context/BookmarkContext'
import filterBookmark from './utils/filterBookmark'

export default function App() {
  const { restore, categories, bookmarks } = UseBookmarkContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const payload = JSON.parse(getLocal('BOOKMARKS'))
    if (payload) {
      restore(payload)
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [])

  const getBookmarks = useMemo(() => {
    return filterBookmark(categories, bookmarks, 'DEFAULT')
  }, [categories, bookmarks])

  const getFavorites = useMemo(() => {
    return filterBookmark(categories, bookmarks, 'FAVORITES')
  }, [categories, bookmarks])

  return (
    <div className='w-full px-8 pt-20'>
      <div className='border-b border-gray-300 mb-10'>
        <p className='w-full mb-8 text-2xl text-gray-500'>Favorites</p>
        <div>
          {!isLoading ? <Bookmark dataBookmarks={getFavorites} /> : null}
        </div>
      </div>
      <div className='flex justify-between flex-wrap'>
        {!isLoading ? <Bookmark dataBookmarks={getBookmarks} /> : null}
      </div>
    </div>
  )
}
