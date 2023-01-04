import { nanoid } from 'nanoid'
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
      payload,
    })
  }

  const getBookmarkDetail = (payload) => {
    handlePopup()
    dispatch({
      type: 'GET_DETAIL',
      payload,
    })
  }

  const handlePopup = () => {
    if(state.isOpen) {
      reset()
      return
    }
    dispatch({
      type: 'HANDLE_ISOPEN',
    })
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'HANDLE_CHANGE',
      name,
      value,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch({
      type: 'SAVE',
      payload: {
        id: nanoid(),
        link: state.link,
        title: state.title,
        category: state.selectedCategory,
      },
    })
    reset()
  }

  const setCategory = (value) => {
    dispatch({
      type: 'SET_CATEGORY',
      value
    })
  }

  const setType = (value) => {
    dispatch({
      type: 'SET_TYPE',
      value
    })
  }

  const handleUpdated = (e) => {
    e.preventDefault()
    if(state.type !== '' && state.type === 'EDIT') {
      dispatch({
        type: 'EDIT',
        payload: {
          id: state.id,
          link: state.link,
          title: state.title,
          category: state.category
        }
      })
      handlePopup()
    }
  }

  const addNewCategory = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_CATEGORIES',
      payload: {
        id: nanoid(),
        value: state.newCategory,
      },
    })
    reset()
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  const deleteItem = (id) => {
    dispatch({
      type: 'DELETE',
      id
    })
  }

  const value = {
    ...state,
    restore,
    handlePin,
    handleArchive,
    getBookmarkDetail,
    handlePopup,
    handleChange,
    handleSave,
    handleUpdated,
    setType,
    setCategory,
    addNewCategory,
    deleteItem
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
