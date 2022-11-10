import { saveLocal } from '../utils/localstorage'

export const bookmarkState = {
  id: '',
  link: '',
  title: '',
  category: '',
  newCategory: '',
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
        id: action.payload[0].id,
        link: action.payload[0].link,
        title: action.payload[0].title,
        category: action.payload[0].category,
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
    case 'RESET':
      return {
        ...state,
        id: null,
        link: '',
        title: '',
        category: '',
        newCategory: '',
      }
    case 'DELETED_CATEGORY':
      break
    case 'RESTORE':
      return {
        ...action.payload
      }
    default:
      return state
  }
}
