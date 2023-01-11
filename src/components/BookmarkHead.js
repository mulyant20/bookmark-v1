import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import {
  BiArchiveOut,
  BiArchiveIn,
  BiDotsVerticalRounded,
  BiPlus,
} from 'react-icons/bi'

const BookmarkHead = ({ data, handleArchive, handlePin, handleAdd }) => {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>{data.value}</p>

      <div className={style.actionWrapper}>
        <button className={style.btnAdd} onClick={() => handleAdd(data.id)}>
          <BiPlus />
        </button>

        <div className={style.floatWrapper}>
          <BiDotsVerticalRounded />
          
          <div className={style.menuFloatWrapper}>
            <div
              className={style.floatAction}
              onClick={() => { data['archive'] === true ? handleArchive(data.id, 'unarchive') : handleArchive(data.id, 'archive')}}
            >
              {data['archive'] === true ? <><BiArchiveOut /> <p>Unarchive</p></> : <><BiArchiveIn /> <p>Archive</p></>}
            </div>

            <div
              className={style.floatAction}
              onClick={() => { data['pin'] === true ? handlePin(data.id) : handlePin(data.id, 'pin') }}
            >
              {data['pin'] === true ? <> <AiFillStar /> <p>Unfavorite</p> </> : <> <AiOutlineStar /> <p>Favorite!</p></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkHead

const style = {
    wrapper: 'w-full pl-6 pr-3 py-3 flex justify-between items-center rounded-t relative',
    title: 'text-gray-600 font-semibold',
    actionWrapper: 'flex justify-between items-center gap-2',
    btnAdd: 'p-2 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-800',
    floatWrapper: 'h-fit w-fit p-2 hover:bg-gray-100 rounded floatWrapper',
    menuFloatWrapper: 'floatAction hidden absolute -top-14 right-0 flex-col gap-2 h-fit border bg-white border border-gray-100 rounded',
    floatAction: 'text-sm px-4 py-2 hover:bg-gray-100/80 text-gray-400 hover:text-gray-800 flex gap-2 items-center justify-center cursor-pointer'
}