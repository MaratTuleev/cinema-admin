import { Box, Button, TextField, Typography, Paper, Autocomplete } from '@mui/material'
import { useState } from 'react'
import ConfirmDeleteDialog from '../helpers/ConfirmDeleteDialog.jsx'

const CategoryEditor = ({category, allFilms, onClose, onSave, onDelete}) => {
  const [name, setName] = useState(category.name)
  const [subCategories, setSubCategories] = useState(category.subCategories || [])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isNew, setIsNew] = useState(category.name === '')

  const addSubCategory = () => {
    setSubCategories([...subCategories, {name: '', filmIds: [], isNew: true}])
  }

  const updateSubCategory = (subCategory, field, value) => {
    setSubCategories(prevSubs => {
      return prevSubs.map(sub => {
        if (sub.name === subCategory.name) {
          return {...sub, [field]: value, isEdited: true}
        }
        return sub
      })
    })
  }

  const deleteSubCategory = (subCategory) => {
    setSubCategories(prevSubs => {
      if (subCategory.id) {
        return prevSubs.map(sub => {
          if (sub.name === subCategory.name) {
            return {...sub, isDeleted: true}
          }
          return sub
        })
      } else return prevSubs.filter(sub => sub.name !== subCategory.name)
    })
  }

  const handleSave = () => {
    onSave({...category, name, subCategories})
  }

  return (
    <Paper sx={{p: 2}}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{isNew ? 'Создание' : 'Редактирование'} категории</Typography>
        {!isNew && <Button color="error" onClick={() => setConfirmOpen(true)} sx={{ml: 1}}>Удалить категорию</Button>}
      </Box>
      <TextField
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
        label="Название категории"
        sx={{mt: 1}}
      />

      {subCategories.filter(subCategory => !subCategory.isDeleted).map((subCategory, subCategoryIndex) => (
        <Box sx={{display: 'grid', mt: 2, ml: 2}} key={subCategoryIndex}>
          <Button sx={{justifySelf: 'end', fontSize: 12}} color="error" onClick={() => deleteSubCategory(subCategory)}>Удалить подкатегорию</Button>
          <TextField
            fullWidth
            value={subCategory.name}
            onChange={e => updateSubCategory(subCategory, 'name', e.target.value)}
            label="Название подкатегории"
            sx={{mt: 1 }}
          />
          <Autocomplete
            disabled={!subCategory.name}
            sx={{mt: 2, ml: 2}}
            value={allFilms.filter(film => subCategory.filmIds.includes(film.id))}
            multiple
            options={allFilms}
            getOptionLabel={(option) => option.name}
            onChange={(_, selectedFilms) => {
              updateSubCategory(subCategory, 'filmIds', selectedFilms.map(film => film.id))
            }}
            renderInput={(params) => <TextField {...params} label="Список фильмов" variant="outlined"/>}
          />
        </Box>
      ))}

      <Button disabled={!name.length} onClick={addSubCategory} sx={{mt: 2}}>Добавить подкатегорию</Button>

      <Box mt={2}>
        <Button variant="contained" onClick={handleSave}>Сохранить</Button>
        <Button onClick={onClose} sx={{ml: 1}}>Отмена</Button>
      </Box>
      <ConfirmDeleteDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          onDelete(category)
          onClose()
        }}
      />
    </Paper>
  )
}

export default CategoryEditor