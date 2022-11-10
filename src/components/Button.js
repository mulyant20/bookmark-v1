export default function Button({ onclick, type, children }) {
  return (
    <button onClick={onclick} className={typeButton(type)}>
      {children}
    </button>
  )
}

const typeButton = (type) => {
  switch (type) {
    case 'cardAction':
      return 'px-2 hover:bg-gray-200 rounded flex justify-between items-center text-gray-800'
    case 'btnAddItem':
      return 'mt-4 w-full h-fit py-1 bg-gray-100/50 hover:bg-gray-200 rounded-md'
    case 'btnSubmit':
      return 'mt-4 w-full py-3 rounded bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white font-semibold'
    default:
      return null
  }
}
