import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema }  from '../../../shared/validations/auth.schema.js'
import { LoginInput } from '../types/auth.types.js'
import { useAppDispatch } from '../hooks/hooks.ts'
import { loginUser } from '../features/auth/auth.thunks.js'
import { useNavigate, Link } from 'react-router-dom'


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginInput>({
      resolver: zodResolver(loginSchema)
    })

    const navigate = useNavigate()
    
    const dispatch = useAppDispatch()

    const onSubmit = (data: LoginInput) => {
      try {

        dispatch(loginUser(data)).unwrap()
        navigate('/')
        
      } catch (error) {

        throw new Error(`Error logging in, ${error}`)

      }
         
        }

  return (
    <div className='p-4 max-w-[400px] w-full  h-[500px] mx-auto border-2 border-slate-500 rounded-md'>
        <h1 className='text-center text-3xl font-bold mb-16'>Login</h1>
        <form 
         className='w-full flex flex-col gap-4 items-center'
         onSubmit={handleSubmit(onSubmit)}>
            <input 
            className='bg-slate-300 w-full p-4 rounded-md focus:ring-2 focus:ring-slate-800'

            {...register('email')} 
            placeholder='Email'/>
            {
              errors.email && <p>{errors.email.message}</p>
            }
            <input 
            className='bg-slate-300 w-full p-4 rounded-md focus:ring-2 focus:ring-slate-800'
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

        <p>
          Don't have an account ?
          <Link to={'/signup'}>create account</Link>
        </p>
    </div>
  )
}

export default LoginForm