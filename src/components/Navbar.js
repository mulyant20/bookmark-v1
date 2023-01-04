import React from 'react'
import { BiSun } from 'react-icons/bi'
import { UseBookmarkContext } from '../context/BookmarkContext'
import Segment from './Segment'

export default function Navbar({ menus, selectMenu }) {
  const { handlePopup, setType } = UseBookmarkContext()

  const newCategory = () => {
    setType('NEW_CATEGORY')
    handlePopup()
  }

  return (
    <div className='h-fit flex justify-between items-center relative'>
      <div className='flex gap-4 items-center'>
        <p className='text-gray-700 text-lg font-semibold'>
          Bookmark <span className='text-gray-400 font-bold'>V1</span>
        </p>
        <button
          className='px-4 py-1 pb-2 hover:bg-purple-800 text-gray-500 hover:text-white rounded-full'
          onClick={newCategory}
        >
          + new category
        </button>
      </div>
      <Segment menus={menus} selectMenu={selectMenu} />
      <button className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300 text-gray-500 text-[18px]'>
        <BiSun/>
      </button>
    </div>
  )
}
