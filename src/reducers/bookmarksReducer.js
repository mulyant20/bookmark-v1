import { saveLocal } from '../utils/localstorage'

export const bookmarkState = {
  id: '',
  link: '',
  title: '',
  category: '',
  newCategory: '',
  type: '',
  isOpen: false,
  bookmarks: [],
  categories: [],
}

export const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_CHANGE':
      return { ...state, [action.name]: action.value }
    case 'SAVE':
      const newSaveData = {
        ...state,
        bookmarks: [...state.bookmarks, { ...action.payload }],
      }
      saveLocal('BOOKMARKS', newSaveData)
      return {
        ...state,
        bookmarks: [...state.bookmarks, { ...action.payload }],
      }
    case 'DELETE':
      const newDeletedBookmark = state.bookmarks.filter((bookmark) => {
        return bookmark.id !== action.id
      })
      const newDeletedData = { ...state, bookmarks: newDeletedBookmark }
      saveLocal('BOOKMARKS', newDeletedData)
      return { ...state, bookmarks: newDeletedBookmark }
    case 'EDIT':
      const newUpdatedBookmark = state.bookmarks.map((bookmark) => {
        if (bookmark.id === action.payload.id) {
          return action.payload
        } else {
          return bookmark
        }
      })
      const newEditedData = { ...state, bookmarks: newUpdatedBookmark }
      saveLocal('BOOKMARKS', newEditedData)
      return { ...state, bookmarks: newUpdatedBookmark }
    case 'GET_DETAIL':
      return {
        ...state,
        id: action.payload.id,
        link: action.payload.link,
        title: action.payload.title,
        category: action.payload.category,
      }
    case 'ADD_CATEGORIES':
      const newCategories = {
        ...state,
        categories: [...state.categories, { ...action.payload }],
      }
      saveLocal('BOOKMARKS', newCategories)
      return {
        ...state,
        categories: [...state.categories, { ...action.payload }],
      }
    case 'ADD_PINNED':
      const pinnedCategory = state.categories.map((category) => {
        if (category.id === action.id) {
          category.pin = true
        }
        return category
      })
      const localPinned = {
        ...state,
        categories: [...pinnedCategory],
      }
      saveLocal('BOOKMARKS', localPinned)
      return {
        ...state,
        categories: [...pinnedCategory],
      }
    case 'DELETE_PINNED':
      const delPinnedCategory = state.categories.map((category) => {
        if (category.id === action.id) {
          category.pin = false
        }
        return category
      })
      const localDelPinned = {
        ...state,
        categories: [...delPinnedCategory],
      }
      saveLocal('BOOKMARKS', localDelPinned)
      return {
        ...state,
        categories: [...delPinnedCategory],
      }
    case 'ARCHIVE':
      const archiveCategory = state.categories.map((category) => {
        if (category.id === action.id) {
          category.archive = true
        }
        return category
      })
      const localArchive = {
        ...state,
        categories: [...archiveCategory],
      }
      saveLocal('BOOKMARKS', localArchive)
      return {
        ...state,
        categories: [...archiveCategory],
      }
    case 'UNARCHIVE':
      const unArchiveCategory = state.categories.map((category) => {
        if (category.id === action.id) {
          category.archive = false
        }
        return category
      })
      const localUnarchive = {
        ...state,
        categories: [...unArchiveCategory],
      }
      saveLocal('BOOKMARKS', localUnarchive)
      return {
        ...state,
        categories: [...unArchiveCategory],
      }
    case 'DELETE_CATEGORY':
      const delCategory = state.categories.filter((category) => {
        return category.id !== action.id
      })
      saveLocal('BOOKMARKS', delCategory)
      return {
        ...state,
        categories: [...delCategory],
      }
    case 'RESET':
      const resetLocal = {
        ...state,
        id: '',
        link: '',
        title: '',
        category: '',
        newCategory: '',
        selectedCategory: '',
        type: '',
        isOpen: false,
      }
      saveLocal('BOOKMARKS', resetLocal)
      return resetLocal
    case 'RESTORE':
      return {
        ...action.payload,
        isOpen: false,
      }
    case 'HANDLE_ISOPEN':
      return { ...state, isOpen: !state.isOpen }
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.value }
    case 'SET_TYPE':
      return { ...state, type: action.value }
    default:
      return state
  }
}
