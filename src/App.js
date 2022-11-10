import { useEffect, useReducer, useState } from 'react'
import { nanoid } from 'nanoid'
import { bookmarkReducer, bookmarkState } from './reducers/bookmarks'
import {
  BiDotsVerticalRounded,
  BiEdit,
  BiTrashAlt,
  BiPlus,
} from 'react-icons/bi'
import Popup from './components/Popup'
import Button from './components/Button'
import { getLocal } from './utils/localstorage'

export default function App() {
  const [state, dispatch] = useReducer(bookmarkReducer, bookmarkState)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isPopup, setIsPopup] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isAddCategory, setIsAddCategory] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'HANDLE_CHANGE',
      name,
      value,
    })
  }

  const handleSave = () => {
    const newId = nanoid()
    dispatch({
      type: 'SAVE',
      payload: {
        id: newId,
        link: state.link,
        title: state.title,
        category: selectedCategory,
      },
    })
    dispatch({ type: 'RESET' })
    setSelectedCategory(null)
    setIsPopup(false)
  }

  const handlePopup = (category) => {
    if (isPopup) {
      setSelectedCategory(null)
      setIsPopup(false)
      dispatch({ type: 'RESET' })
      isEdit && setIsEdit(false)
      isAddCategory && setIsAddCategory(false)
    } else {
      setSelectedCategory(category)
      setIsPopup(true)
    }
  }

  const getBookmarkDetail = (id) => {
    const bookmark = state.bookmarks.filter((bookmark) => {
      return bookmark.id === id
    })
    dispatch({
      type: 'GET_DETAIL',
      payload: bookmark,
    })
    setIsPopup(true)
    setIsEdit(true)
  }

  const handleUpdated = () => {
    if (isEdit) {
      dispatch({
        type: 'EDIT',
        payload: {
          id: state.id,
          link: state.link,
          title: state.title,
          category: state.category,
        },
      })
      setIsEdit(false)
      dispatch({ type: 'RESET' })
    }
  }

  const handleAddNewCategory = () => {
    setIsAddCategory(true)
    setIsPopup(true)
  }

  const addNewCategory = () => {
    const newId = nanoid()
    dispatch({
      type: 'ADD_CATEGORIES',
      payload: {
        id: newId,
        value: state.newCategory,
      },
    })
    setIsAddCategory(false)
    handlePopup()
  }

  useEffect(() => {
    const payload = JSON.parse(getLocal('BOOKMARKS'))
    if (payload) {
      dispatch({
        type: 'RESTORE',
        payload,
      })
    }
  }, [])

  return (
    <div className={style.container}>
      <div className={style.cardWrapper}>
        {state.categories.map((category) => {
          return (
            <div key={category.id} className={style.card}>
              <p className={style.cardTitle}>{category.value}</p>
              {state.bookmarks.map((bookmark) => {
                if (bookmark.category === category.value) {
                  return (
                    <div key={bookmark.id} className={style.cardItem}>
                      <a
                        className={style.cardLink}
                        href={bookmark.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {bookmark.title}
                      </a>
                      <div className={style.cardActionWrapper}>
                        <BiDotsVerticalRounded />
                        <div className={style.cardActionFloat}>
                          <Button
                            onclick={() =>
                              dispatch({ type: 'DELETE', id: bookmark.id })
                            }
                            type='cardAction'
                          >
                            Delete
                            <span className={style.cardIcon}>
                              <BiTrashAlt />
                            </span>
                          </Button>
                          <Button
                            onclick={() => getBookmarkDetail(bookmark.id)}
                            type='cardAction'
                          >
                            Update
                            <span className={style.cardIcon}>
                              <BiEdit />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                } else return null
              })}
              <Button
                onclick={() => handlePopup(category.value)}
                type='btnAddItem'
              >
                Add
              </Button>
            </div>
          )
        })}
        <div className={style.cardNewCategory} onClick={handleAddNewCategory}>
          <BiPlus />
          <p className={style.textCardNewCategory}>New Category</p>
        </div>
      </div>

      {isPopup ? (
        <Popup handlePopup={handlePopup}>
          {isAddCategory ? (
            <>
              <form onSubmit={addNewCategory} className={style.form}>
                <input
                  name='newCategory'
                  onChange={handleChange}
                  value={state.newCategory}
                  placeholder='Category name'
                  className={style.textfield}
                  autoFocus
                />
                <Button onclick={addNewCategory} type='btnSubmit'>
                  Save
                </Button>
              </form>
            </>
          ) : (
            <>
              <form
                onSubmit={() => {isEdit ? handleUpdated() : handleSave()}}
                className={style.form}
              >
                <input
                  name='link'
                  onChange={handleChange}
                  value={state.link}
                  placeholder='Link'
                  className={style.textfield}
                  autoFocus
                />

                <input
                  name='title'
                  onChange={handleChange}
                  value={state.title}
                  placeholder='Title'
                  className={style.textfield}
                />

                <Button
                  onclick={() => {isEdit ? handleUpdated() : handleSave()}}
                  type='btnSubmit'
                >
                  {isEdit ? 'Updated' : 'Save'}
                </Button>
              </form>
            </>
          )}
        </Popup>
      ) : null}
    </div>
  )
}

const style = {
  container: 'max-w-[1200px] min-h-screen mx-auto pt-8',
  cardWrapper: 'w-full h-fit flex gap-4 md:gap-12 flex-wrap px-4 md:px-0 items-start',
  card: 'w-full md:w-64 h-fit p-4 bg-white rounded-lg border border-gray-200',
  cardTitle: 'text-lg font-semibold text-gray-700 mb-2 border-b border-gray-100',
  cardItem: 'flex justify-between items-center mt-2',
  cardLink: 'block text-gray-500 hover:text-gray-800',
  cardActionWrapper: 'relative h-fit w-fit p-[1px] pb-[2px] rounded cursor-pointer hover:bg-gray-100 optionWrapper',
  cardActionFloat: 'absolute w-28 bottom-[1rem] right-1/2 translate-x-1/2 px-2 bg-gray-100/40 backdrop-blur-sm border border-gray-200 p-2 rounded-lg options shadow shadow-gray-100/70 flex-col gap-[3px] hidden',
  cardIcon: 'text-gray-400',
  cardNewCategory: 'w-full md:w-64 flex flex-col items-center justify-center font-semibold text-2xl h-32 text-gray-300 bg-gray-200/40 rounded-lg border border-gray-200 cursor-pointer',
  textCardNewCategory: 'text-sm font-normal text-gray-600 mt-2',
  textfield: 'px-4 py-2 bg-gray-100 text-gray-600 rounded outline-none border-2 border-gray-200 focus:border-blue-500',
  form: 'flex flex-col gap-y-4 py-8 px-6',
}
