import { UseBookmarkContext } from '../context/BookmarkContext'
import Button from './Button'

export default function Popup() {
  const bookmarkContext = UseBookmarkContext()

  return (
    <div className={style.popupWrapper}>
      <div
        className={style.popupLayer}
        onClick={bookmarkContext.handlePopup}
      ></div>
      <div className={style.popup}>{Form(bookmarkContext)}</div>
    </div>
  )
}

const Form = ({
  type,
  handleSave,
  title,
  link,
  handleChange,
  handleUpdated,
  newCategory,
  addNewCategory,
}) => {
  switch (type) {
    case 'SAVE':
      return (
        <>
          <form onSubmit={handleSave} className={style.form}>
            <input
              name='link'
              onChange={handleChange}
              value={link}
              placeholder='Link'
              className={style.textfield}
              autoFocus
            />

            <input
              name='title'
              onChange={handleChange}
              value={title}
              placeholder='Title'
              className={style.textfield}
            />

            <Button onclick={handleSave} type='btnSubmit'>
              SAVE
            </Button>
          </form>
        </>
      )
    case 'EDIT':
      return (
        <>
          <form onSubmit={handleUpdated} className={style.form}>
            <input
              name='link'
              onChange={handleChange}
              value={link}
              placeholder='Link'
              className={style.textfield}
              autoFocus
            />

            <input
              name='title'
              onChange={handleChange}
              value={title}
              placeholder='Title'
              className={style.textfield}
            />

            <Button onclick={handleUpdated} type='btnSubmit'>
              Update
            </Button>
          </form>
        </>
      )

    case 'NEW_CATEGORY':
      return (
        <>
          <form onSubmit={addNewCategory} className={style.form}>
            <input
              name='newCategory'
              onChange={handleChange}
              value={newCategory}
              placeholder='Category name'
              className={style.textfield}
              autoFocus
            />
            <Button onclick={addNewCategory} type='btnSubmit'>
              Save
            </Button>
          </form>
        </>
      )
    default:
      return 'tidak ada'
  }
}

const style = {
  popupWrapper: 'w-screen min-h-screen fixed top-0 left-0',
  popupLayer: 'absolute top-0 left-0 w-full h-full bg-black/10 z-10',
  popup:
    'w-[400px] max-w-full h-fit mx-auto bg-white rounded mt-32 mx-auto absolute top-20 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20',
  textfield:
    'px-4 py-2 bg-gray-100 text-gray-600 rounded outline-none border-2 border-gray-200 focus:border-blue-500',
  form: 'flex flex-col gap-y-4 py-8 px-6',
}
