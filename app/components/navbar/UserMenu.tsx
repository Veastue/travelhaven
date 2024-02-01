'use client'
import React, { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Avatar from '../Avatar'
import MenuItems from './MenuItems';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModel';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const[isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setIsOpen(!isOpen)
    },[isOpen])

    const onRent = useCallback(()=> {
        if(!currentUser){
            return loginModal.onOpen();
        }else {
            return rentModal.onOpen();
        }
    }, [currentUser, loginModal, rentModal])
  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div 
            onClick={onRent} 
            className='hidden md:block tetx-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                TravelHaven your destination
            </div>
            <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer haver:shadow-md transistion'>
                <AiOutlineMenu size={20} className='ml-1'/>
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItems 
                            onclick={()=>router.push('/trips')} 
                            label='My trips'
                            />
                            <MenuItems 
                            onclick={()=>router.push('/favorites')} 
                            label='My favorites'
                            />
                            <MenuItems 
                            onclick={()=>{router.push('/reservations')}} 
                            label='My reservations'
                            />
                            <MenuItems 
                            onclick={()=>router.push('/properties')} 
                            label='My properties'
                            />
                            <MenuItems 
                            onclick={rentModal.onOpen} 
                            label='TavelHaven my destination'
                            />
                            <hr />
                            <MenuItems 
                            onclick={()=> signOut()} 
                            label='Log out'
                            />
                        </>
                    ): (
                        <>
                            <MenuItems 
                            onclick={loginModal.onOpen} 
                            label='Login'
                            />
                            <MenuItems 
                            onclick={registerModal.onOpen}
                            label='Sign up'
                            />
                        </>
                    ) }
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu