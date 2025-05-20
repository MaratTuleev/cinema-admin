import { Box, Button, Paper, Typography } from '@mui/material'

const Category = ({category, films, handleEditCategory}) => {
  return (
    <Paper key={category.name} sx={{p: 2, mt: 2}}>
      <Typography variant="h6">
        {category.name} <Button size="small" onClick={() => handleEditCategory(category)}>редактировать</Button>
      </Typography>

      {category.subCategories.filter(subCategory => !subCategory.isDeleted).map((sub, i) => (
        <Box key={i} ml={2}>
          <Typography variant="subtitle1">{sub.name}</Typography>
          <ul>
            {sub.filmIds.map(fid => {
              const film = films.find(f => f.id === fid)
              return <li key={fid}>{film?.name}</li>
            })}
          </ul>
        </Box>
      ))}
    </Paper>
  )
}

export default Category