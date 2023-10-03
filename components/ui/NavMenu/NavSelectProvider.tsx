"use client"
import React from 'react';
import { useState } from 'react';

interface SelectedNavItemContextProps {
    selectedItemNumber: number;
    setSelectedItemNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectedNavItemContext = React.createContext<SelectedNavItemContextProps | null>(null);


export default function SelectedNavItemContextProvider({ children }:{children:any}){
    const [selectedItemNumber, setSelectedItemNumber] = useState<number>(0);
  
    return (
      <SelectedNavItemContext.Provider value={{ selectedItemNumber: selectedItemNumber, setSelectedItemNumber: setSelectedItemNumber }}>
        {children}
      </SelectedNavItemContext.Provider>
    );
  };
