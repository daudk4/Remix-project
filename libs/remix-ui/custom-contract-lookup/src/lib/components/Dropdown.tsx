import React from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'

export const NetworkDropdown = ({selectedValue, handleSelect}) => {
  return (
    <DropdownButton title={selectedValue} onSelect={handleSelect} variant="primary" id="dropdown-basic-button">
    <Dropdown.Item eventKey="Ethereum">Ethereum Mainnet</Dropdown.Item>
    <Dropdown.Item eventKey="Creatachain">Creatachain Testnet</Dropdown.Item>
  </DropdownButton>
  )
}
