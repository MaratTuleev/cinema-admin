import { Box, Button, Typography, Dialog } from '@mui/material'
import { useState } from 'react'
import { saveCategories } from '../api'
import CategoryEditor from './CategoryEditor'
import Category from './Category'
import InfoSnackbar from '../helpers/InfoSnackbar.jsx'
import useFilmsAndCategories from '../hooks/useFilmsAndCategories.js'
import FullscreenLoader from './FullscreenLoader.jsx'

const CategoryList = () => {
  const [deletedCategories, setDeletedCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const {categories, setCategories, films, isLoading, reload} = useFilmsAndCategories()

  const handleSave = async () => {
    const payload = {
      newCategories: categories.filter(c => !c.id),
      updatedCategories: categories.filter(c => c.id && c.modified).map(category => {
        return {
          id: category.id,
          name: category.name,
          newSubCategories: category.subCategories.filter(subCategory => subCategory.isNew && !subCategory.isDeleted),
          deletedSubCategories: category.subCategories.filter(subCategory => subCategory.isDeleted),
          updatedSubCategories: category.subCategories.filter(subCategory => {
            return subCategory.isEdited && !subCategory.isNew && !subCategory.isDeleted
          })
        }
      }),
      deletedCategories
    }
    await saveCategories(payload)
    setIsSaved(true)
    await reload()
  }

  const handleEditCategory = (updatedCat) => {
    setCategories(prev => {
      const idx = prev.findIndex(c => c === editingCategory)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = {...updatedCat, modified: true}
        return copy
      } else {
        return [...prev, updatedCat]
      }
    })
    setEditingCategory(null)
  }

  const handleDeleteCategory = () => {
    setCategories(prevCategoryState => {
      const idx = prevCategoryState.findIndex(c => c === editingCategory)
      if (idx >= 0) {
        setDeletedCategories(prev => [...prev, {id: editingCategory.id}])
        return prevCategoryState.filter(category => category.id !== editingCategory.id)
      } else {
        return prevCategoryState.filter(category => category.name !== editingCategory.name)
      }
    })
  }

  const handleCloseAlert = () => {
    setIsSaved(false)
  }

  const renderEditModal = () => {
    return (
      editingCategory &&
      <Dialog open={!!editingCategory} onClose={() => setEditingCategory(null)} scroll="paper" fullWidth>
        <CategoryEditor
          category={editingCategory}
          allFilms={films}
          onClose={() => setEditingCategory(null)}
          onSave={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </Dialog>
    )
  }

  if (isLoading) {
    return <FullscreenLoader/>
  }

  return (
    <Box mt={4}>
      <Typography variant="h4">Категории</Typography>
      <Box sx={{mt: 4, display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <Button onClick={() => setEditingCategory({name: '', subCategories: []})}>
          Добавить категорию
        </Button>
        <Button variant="contained" onClick={handleSave} sx={{ml: 2}}>
          Сохранить на сервер
        </Button>
      </Box>

      {renderEditModal()}

      {categories.map((category, idx) => (
        <Category key={idx} category={category} handleEditCategory={setEditingCategory} films={films}/>
      ))}

      <InfoSnackbar onClose={handleCloseAlert} isOpen={isSaved} text="Категории обновлены!"/>
    </Box>
  )
}

export default CategoryList