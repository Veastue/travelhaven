'use client'
import React from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback } from 'react';
import {
    FieldValues, 
    RegisterOptions, 
    SubmitHandler, 
    UseFormRegisterReturn, 
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Buttons from '../Buttons';
import Modal from './Modal';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModel';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const[isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
        .post('/api/register', data)
        .then(()=> {
            registerModal.onClose()
            toast.success('Registered, you may log in!')
            loginModal.onOpen()
        })
        .catch((error)=>{
            toast.error(error.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const toggle = useCallback(()=> {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to TravelHaven'
                subtitle='Create an account!'
            />
            <Input 
            id={'email'} 
            label={'Email'}
            register={register}
            errors={errors} 
            required
            />
            <Input 
            id={'name'} 
            label={'Name'}
            register={register}
            errors={errors} 
            required
            />
            <Input 
            id={'password'} 
            label={'Password'}
            type='password'
            register={register}
            errors={errors} 
            required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Buttons
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Buttons
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={()=> signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex justify-center flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline'
                        onClick={toggle}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
    disabled={isLoading} 
    isOpen={registerModal.isOpen} 
    title='Register' 
    actionLabel='Continue' 
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal