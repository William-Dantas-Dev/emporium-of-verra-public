"use client";
import { ErrorMessage } from '@/types';
import { registerValidation } from '@/validations/auth.validation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useState } from 'react'
import { ValidationError } from 'yup';
import { CustomButton, CustomInput, Loading, SelectInput, SelectInputGroup } from '@/components';
import { servers } from '@/constants';
import { Input } from '@nextui-org/react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { EyeSlashIcon } from '@heroicons/react/24/outline';

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nick, setNick] = useState<string>('');
  const [server, setServer] = useState<string>('SA 1');
  const [errors, setErrors] = useState<{ [key: string] : string }>({});
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent){
    event.preventDefault();
    setLoading(true);
    try{
      await registerValidation.validate({ name, email, nick, server, password, confirmPassword }, { strict: true, abortEarly: false});
      const result = await signIn('credentials', {
        name,
        email,
        password,
        nick,
        server,
        type: 'register',
        redirect: false,
      });
      if(result?.error){
        const errorMessage = result.error === 'email' ? 'E-mail already registered' : 'Failed to Register User';
        let formErrors: { [key: string]: string } = {};
        formErrors.apiError = `${errorMessage}`;
        setErrors(formErrors);
        return;
      }
      setLoading(false);
      router.replace('/');
    }catch (e : any) {
      setLoading(false);
      let errors: ErrorMessage[] = [];
      if (e instanceof ValidationError) {
        e.inner.forEach(error => {
          const errorObject: ErrorMessage = {
            name: error.path || '',
            message: error.message,
          }
          errors.push(errorObject);
        });
      } else {
        console.error('Unexpected error:', e);
      }
      let formErrors: { [key: string]: string } = {};
      let error;
      if(error = handleFilter(errors, "name")){
        formErrors.name = error.message;
      }
      if(error = handleFilter(errors, "email")){
        formErrors.email = error.message;
      }
      if(error = handleFilter(errors, "password")){
        formErrors.password = error.message;
      }
      if(error = handleFilter(errors, "nick")){
        formErrors.nick = error.message;
      }
      if(error = handleFilter(errors, "server")){
        formErrors.server = error.message;
      }
      if(error = handleFilter(errors, "confirmPassword")){
        formErrors.confirmPassword = error.message;
      }
      setErrors(formErrors);
    }
  }

  const handleFilter = (errors: ErrorMessage[], value : string) => {
    return errors.find(error => error.name === value);
  }

  return (
    loading ? <> <Loading /> </> : 
    <div className="flex h-full w-full flex-col my-auto">
      <h2 className="text-center text-2xl font-bold tracking-tight text-white">Register Your Account</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}
          <div>
            <Input type="name" label="Name" onChange={(e) => setName(e.target.value)} color={errors.name? 'danger' : 'default'}/>
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <Input type="email" label="Email" onChange={(e) => setEmail(e.target.value)} color={errors.email? 'danger' : 'default'}/>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Input
              type={isVisible ? "text" : "password"}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              color={errors.password? 'danger' : 'default'}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none size-6" />
                  ) : (
                    <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none size-6" />
                  )}
                </button>
              }
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div>
            <Input
              type={isVisible ? "text" : "password"}
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              color={errors.confirmPassword? 'danger' : 'default'}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none size-6" />
                  ) : (
                    <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none size-6" />
                  )}
                </button>
              }
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div>
            <Input type="nick" label="Nick" onChange={(e) => setNick(e.target.value)} color={errors.nick? 'danger' : 'default'}/>
            {errors.nick && <p className="text-red-500">{errors.nick}</p>}
          </div>
          <SelectInputGroup label={'Select Server'} value={server} defaultValue='NA-1' onChange={setServer} items={servers} nullable={false}/>
          <CustomButton type='submit' title='Register' onClick={() => {}}/>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Always Have Account?
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1">Login Here</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
