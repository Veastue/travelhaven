'use client'
import React from 'react'
import {signIn} from 'next-auth/react'
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
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Buttons from '../Buttons';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModel';
import useRegisterModal from '@/app/hooks/useRegisterModal';


const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const[isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                loginModal.onClose();
                toast.success('Logged In');
                router.refresh();
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const toggle = useCallback(()=> {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back'
                subtitle='Login to your account!'
            />
            <Input 
            id={'email'} 
            label={'Email'}
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
                onClick={()=>signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex justify-center flex-row items-center gap-2'>
                    <div>
                        First time using TravelHaven?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline'
                        onClick={toggle}
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
    disabled={isLoading} 
    isOpen={loginModal.isOpen} 
    title='Login' 
    actionLabel='Continue' 
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal