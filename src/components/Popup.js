export default function Popup({ children, handlePopup }) {
  return (
    <div className={style.popupWrapper}>
      <div
        className={style.popupLayer}
        onClick={handlePopup}>
      </div>
      <div className={style.popup}>
        {children}
      </div>
    </div>
  )
}

const style = {
  popupWrapper: 'w-screen min-h-screen fixed top-0 left-0',
  popupLayer:'absolute top-0 left-0 w-full h-full bg-black/10 z-10',
  popup:'w-[400px] max-w-full h-fit mx-auto bg-white rounded mt-32 mx-auto absolute top-20 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20'
}