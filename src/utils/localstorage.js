export const saveLocal = (id, data) => {
    return localStorage.setItem(id, JSON.stringify(data))
}

export const getLocal = (id) => {
    return localStorage.getItem(id)
}