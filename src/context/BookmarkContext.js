import { createContext, useReducer, useContext } from 'react'
import { bookmarkReducer, bookmarkState } from '../reducers/bookmarksReducer'

const BookmarkContext = createContext(bookmarkState)

export const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, bookmarkState)

  const handlePin = (id, type) => {
    if (type === 'pin') {
      dispatch({ type: 'ADD_PINNED', id })
    } else {
      dispatch({ type: 'DELETE_PINNED', id })
    }
  }
  const handleArchive = (id, type) => {
    if (type === 'archive') {
      dispatch({ type: 'ARCHIVE', id })
    } else {
      dispatch({ type: 'UNARCHIVE', id })
    }
  }
  const restore = (payload) => {
    dispatch({
      type: 'RESTORE',
      payload
    })
  }

  const value = {
    bookmarks: state.bookmarks,
    categories: state.categories,
    id: state.id,
    link: state.link,
    title: state.title,
    category: state.category,
    newCategory: state.newCategory,
    restore,
    handlePin,
    handleArchive,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}

export const UseBookmarkContext = () => {
  const context = useContext(BookmarkContext)
  return context
}