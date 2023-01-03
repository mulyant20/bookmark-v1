import { useCallback, useEffect, useMemo, useState } from 'react'
import { getLocal } from './utils/localstorage'
import Bookmark from './components/Bookmark'
import { UseBookmarkContext } from './context/BookmarkContext'
import filterBookmark from './utils/filterBookmark'
import Popup from './components/Popup'
import Segment from './components/Segment'
import Navbar from './components/Navbar'

const initMenus = [
  {
    value: 'all',
    isActive: false,
  },
  {
    value: 'favorites',
    isActive: true,
  },
  {
    value: 'archives',
    isActive: false,
  },
]

export default function App() {
  const { restore, categories, bookmarks, isOpen } = UseBookmarkContext()
  const [isLoading, setIsLoading] = useState(true)
  const [menus, setMenus] = useState(initMenus)
  const [selectedMenus, setSelectedMenus] = useState('favorites')

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

  const getArchives = useMemo(() => {
    return filterBookmark(categories, bookmarks, 'ARCHIVES')
  }, [categories, bookmarks])
  
  useEffect(() => {
    const newMenu = menus
      .map((menu) => ({ ...menu, isActive: false }))
      .map((menu) => {
        if (menu.value === selectedMenus) {
          menu.isActive = true
          return menu
        }
        return menu
      })
    setMenus(newMenu)

    return () => menus
  }, [selectedMenus])


  return (
    <div className={style.container}>
      <Navbar menus={menus} selectMenu={setSelectedMenus} />
      <div className={style.default}>
        {selectedMenus === 'all' && <Bookmark dataBookmarks={getBookmarks}/>}
        {selectedMenus === 'favorites' && <Bookmark dataBookmarks={getFavorites}/>}
        {selectedMenus === 'archives' && <Bookmark dataBookmarks={getArchives}/>}
      </div>
      {isOpen ? <Popup /> : null}
    </div>
  )
}

const style = {
  container: 'w-full px-8 pt-8',
  title: 'w-full mb-8 text-2xl text-gray-500',
  default: 'grid grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] gap-4 mt-8',
}
