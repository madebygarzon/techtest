import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
  
  import React from 'react'
  
  const SelectLanguage = () => {
    return (
     <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Idioma" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">🇪🇸 Español</SelectItem>
        <SelectItem value="dark">🇺🇸 Ingles</SelectItem>
      </SelectContent>
    </Select>
    )
  }
  
  export default SelectLanguage
  
  
  
  
  
