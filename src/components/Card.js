export default function Card() {
  return (
    <div className={style.card}>
      <p className={style.titleCard}>{title}</p>
      {children}
    </div>
  )
}
