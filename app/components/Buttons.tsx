'use client'

import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label?:string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Buttons: React.FC<ButtonProps> = ({
    onClick,
    label,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
  return (
    <button className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
    ${outline? 'bg-white': 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'} 
    ${outline? 'border-stone-700': 'border-none'} 
    ${outline? 'text-black': 'text-white'} 
    ${small? 'py-1': 'py-3'} 
    ${small? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500': 'py-3'} 
    ${small? 'text-sm': 'text-md'}
    ${small? 'font-light': 'font-semibold'}
    ${small? 'border-[1px]': 'border-2'}`
    } onClick={onClick} disabled={disabled}>
        {Icon && (
            <Icon size={24} className='absolute left-4 top-3'/>
        )}
        {label}
    </button>
  )
}

export default Buttons