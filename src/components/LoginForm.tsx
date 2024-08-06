"use client";
import { ErrorMessage } from '@/types';
import { authValidation } from '@/validations/auth.validation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useState } from 'react'
import { ValidationError } from 'yup';
import { CustomButton, Loading } from '@/components';
import { Input } from '@nextui-org/react';

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string] : string }>({});

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent){
    event.preventDefault();
    setLoading(true);
    try{
      await authValidation.validate({ email, password }, { strict: true, abortEarly: false});
      const result = await signIn('credentials', {
        email,
        password,
        type: 'login',
        redirect: false,
      })
      console.log(result);
      if(result?.error){
        let formErrors: { [key: string]: string } = {};
        formErrors.apiError = `${result.error}`;
        setErrors(formErrors);
        return;
      }
      setLoading(false);
      router.replace('/admin');
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
      if(error = handleFilter(errors, "email")){
        formErrors.email = error.message;
      }
      if(error = handleFilter(errors, "password")){
        formErrors.password = error.message;
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
      <h2 className="text-center text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
        {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}
          <div>
            <Input type="email" label="Email" onChange={(e) => setEmail(e.target.value)} color={errors.email? 'danger' : 'default'}/>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Input type="password" label="password" onChange={(e) => setPassword(e.target.value)} color={errors.password? 'danger' : 'default'}/>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <CustomButton type='submit' title='Sign In' onClick={() => {}}/>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?
          <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1">Register Here</a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
