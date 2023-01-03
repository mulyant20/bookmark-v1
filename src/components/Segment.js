import React from 'react'

export default function Segment({ menus, selectMenu }) {
  return (
    <div className='p-[3px] bg-gray-200 border border-gray-300 rounded-full inline-flex gap-2 absolute left-1/2 -translate-x-1/2'>
      {menus.map((menu, index) => (
        <div
          className={menu.isActive ? style.activeButton : style.button}
          onClick={() => selectMenu(menu.value)}
          key={index}
        >
          {menu.value}
        </div>
      ))}
    </div>
  )
}

const style = {
  button: 'p-2 px-8 capitalize rounded-full cursor-pointer text-sm text-gray-500',
  activeButton: 'p-2 px-8 capitalize bg-white rounded-full cursor-pointer text-sm shadow-lg',
}
