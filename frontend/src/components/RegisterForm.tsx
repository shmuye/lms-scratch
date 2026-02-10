import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema }  from '../../../shared/validations/auth.schema.js'
import { RegisterInput } from '../types/auth.types.ts'
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts'
import { registerUser } from '../features/auth/auth.thunks.ts'
import { useNavigate, Link } from 'react-router-dom'


const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<RegisterInput>({
      resolver: zodResolver(registerSchema)
    })

    const navigate = useNavigate()
    
    const dispatch = useAppDispatch()

   

    const onSubmit = async (data: RegisterInput) => {
      try {

        const result = await dispatch(registerUser(data)).unwrap()
        console.log("Registered user", result)
        navigate('/login')
        
      } catch (error) {

        throw new Error(`Error logging in, ${error}`)

      }
}

  return (
    <div className='p-4 max-w-[400px] w-full mx-auto rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md'>
        <form 
          className='w-full flex py-5 gap-4 flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}>
             <input 
            className='w-full p-4 rounded-md focus:ring-2 focus:ring-slate-800'

            {...register('name')} 
            placeholder='Name '/>
            {
              errors.name && <p>{errors.name.message}</p>
            }
            
            <input 
            className='w-full p-4 rounded-md focus:ring-2 focus:ring-slate-800'

            {...register('email')} 
            placeholder='Email'/>
            {
              errors.email && <p>{errors.email.message}</p>
            }
            <input 
            className='w-full p-4 rounded-md focus:ring-2 focus:ring-slate-800'
            type='password'
            {...register('password')} 
            placeholder='Password'/>
            {
              errors.password && <p>{errors.password.message}</p>
            }

            <button 
            className='w-full rounded-full bg-blue-800 text-white p-4 cursor-pointer'
            type='submit'>Register</button>

        </form>
        <p>
            Already have an account?
            <Link to={'/login'}>login</Link>
        </p>
        
    </div>
  )
}

export default RegisterForm