import { useEffect, useMemo, useState } from 'react'
import { getLocal } from './utils/localstorage'
import Bookmark from './components/Bookmark'
import { UseBookmarkContext } from './context/BookmarkContext'
import filterBookmark from './utils/filterBookmark'
import Popup from './components/Popup'

export default function App() {
  const { restore, categories, bookmarks, isOpen } = UseBookmarkContext()
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
    <div className={style.container}>
      <div className={style.favorites}>
        <p className={style.title}>Favorites</p>
        <div>
          {!isLoading ? <Bookmark dataBookmarks={getFavorites} /> : null}
        </div>
      </div>
      <div className={style.default}>
        {!isLoading ? <Bookmark dataBookmarks={getBookmarks} /> : null}
      </div>
      {isOpen ? <Popup /> : null}
    </div>
  )
}

const style = {
  container: 'w-full px-8 pt-20',
  favorites: 'border-b border-gray-300 mb-10',
  title: 'w-full mb-8 text-2xl text-gray-500',
  default: 'flex justify-between flex-wrap',
}
