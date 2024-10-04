import {ChangeEvent, FormEvent} from 'react'

export interface NetworkDropdown {
  selectedValue: string
  handleSelect: (eventKey: string | null) => void
}

export interface InputField {
  inputValue: string
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}
