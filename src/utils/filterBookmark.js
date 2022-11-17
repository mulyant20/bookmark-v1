export default function filterBookmark(categories, bookmarks, type) {
  switch (type) {
    case 'FAVORITES':
      const favoriteCategories = categories.filter((category) => {
        return category['pin'] === true
      })

      if (favoriteCategories.length > 0) {
        const dataFavorites = favoriteCategories.map((category) => {
          const data = bookmarks.filter((bookmark) => {
            return bookmark.category === category.value
          })

          return {
            ...category,
            bookmarks: data.length > 0 ? data : null,
          }
        })

        return dataFavorites
      } else {
        return null
      }
    case 'DEFAULT':
    default:
      const defaultCategories = categories.filter((category) => {
        return (
          (!category.hasOwnProperty('pin') || category['pin'] === false) &&
          (!category.hasOwnProperty('archives') ||
            category['archives'] === false)
        )
      })

      const defaultBookmark = defaultCategories.map((category) => {
        const data = bookmarks.filter((bookmark) => {
          return (
            bookmark.category !== null && bookmark.category === category.value
          )
        })

        return {
          ...category,
          bookmarks: data.length > 0 ? data : null,
        }
      })

      return defaultBookmark
  }
}