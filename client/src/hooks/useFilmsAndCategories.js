import { useEffect, useState, useCallback } from 'react'
import { fetchCategories, fetchFilms } from '../api'

const useFilmsAndCategories = () => {
  const [categories, setCategories] = useState([])
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    return Promise.all([fetchCategories(), fetchFilms()])
      .then(([catData, filmData]) => {
        setCategories(catData)
        setFilms(filmData)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    loadData()
  }, [])

  return {
    categories,
    setCategories,
    films,
    isLoading,
    reload: loadData,
  }
}

export default useFilmsAndCategories