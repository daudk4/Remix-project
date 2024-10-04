import React, {useState, ChangeEvent, FormEvent} from 'react'

import {NetworkDropdown} from './Dropdown'
import {InputField} from './InputField'

export const CustomContractLookup = (props) => {
  console.log(props)
  const [selectedValue, setSelectedValue] = useState<string>('Select Network')
  const handleSelect = (eventKey: string | null) => {
    setSelectedValue(eventKey)
  }
  const [inputValue, setInputValue] = useState<string>('')
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() 
    props.plugin.data= {
        network: selectedValue,
        contractAddress: inputValue,
    }
    props.plugin.renderComponent();
  }
  return (
    <div>
      <NetworkDropdown selectedValue={selectedValue} handleSelect={handleSelect} />
      <InputField inputValue={inputValue} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </div>
  )
}
