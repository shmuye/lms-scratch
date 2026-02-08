import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema }  from '../../../shared/validations/auth.schema.js'
import { LoginInput } from '../types/auth.types.js'
import { useAppDispatch } from '../hooks/hooks.ts'
import { loginUser } from '../features/auth/auth.thunks.js'


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginInput>({
      resolver: zodResolver(loginSchema)
    })

   

    const dispatch = useAppDispatch()

    const onSubmit = (data: LoginInput) => {
         dispatch(loginUser(data))
        }

  return (
    <div className='p-4 max-w-[400px] w-full  h-[500px] mx-auto border-2 border-slate-500 bg-gradient-to-br from-blue-500 to-slate-500'>
        <h1 className='text-center text-3xl text-white font-bold mb-16'>Login to your Account</h1>
        <form 
         className='w-full flex flex-col gap-4 items-center'
         onSubmit={handleSubmit(onSubmit)}>
            <input 
            className='w-full p-4 rounded-sm focus:ring-2 focus:ring-slate-800'

            {...register('email')} 
            placeholder='Email'/>
            {
              errors.email && <p>{errors.email.message}</p>
            }
            <input 
            className='w-full p-4 rounded-sm focus:ring-2 focus:ring-slate-800'
            type='password'
            {...register('password')} 
            placeholder='Enter Password'/>
            {
              errors.password && <p>{errors.password.message}</p>
            }

            <button 
            className='w-full rounded-full bg-blue-800 text-white p-4 cursor-pointer'
            type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default LoginForm