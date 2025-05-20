import { deepCamelCase, deepSnakeCase } from './utils.js'

const API_BASE = 'http://localhost:3001'

export const fetchFilms = async () => {
  const res = await fetch(`${API_BASE}/films`)
  const films = await res.json()
  return deepCamelCase(films)
}

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`)
  const categories = await res.json()
  return deepCamelCase(categories)
}

export const saveCategories = async (payload) => {
  const res = await fetch(`${API_BASE}/categories/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deepSnakeCase(payload))
  })
  return res.json()
}