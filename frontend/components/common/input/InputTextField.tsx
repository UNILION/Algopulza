import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { TextFieldAttr } from '../../../util/dto'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  valid(item: string): boolean
  errorMessage: string
  setter: any
  onKeyDown(event: any): void
}

export default function InputTextField({ textFieldAttr, valid, errorMessage, setter, onKeyDown }: TextFieldProps) {
  const [isValid, setIsValid] = useState(true)

  const handleChange = (event: any) => {
    setter(event.target.value)
    setIsValid(valid(event.target.value))
  }
  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {isValid ?
        <TextField
          sx={{width: textFieldAttr.width, marginBottom: textFieldAttr.marBot, marginRight: textFieldAttr.marRig}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.isPw ? 'password' : ""}
          autoFocus={textFieldAttr.isAf ? true : false}
          variant="outlined"
          size="small"
          onChange={handleChange}
          onKeyDown={onKeyDown}
        /> :
        <TextField
          error
          sx={{width: textFieldAttr.width, marginBottom: textFieldAttr.marBot, marginRight: textFieldAttr.marRig}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.isPw ? 'password' : ""}
          helperText={errorMessage}
          size="small"
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
      }
    </Box>
  )
}
