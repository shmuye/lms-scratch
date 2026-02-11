import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema }  from '../../../shared/validations/auth.schema.js'
import { LoginInput } from '../types/auth.types.js'
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts'
import { loginUser } from '../features/auth/auth.thunks.js'
import { useNavigate, Link } from 'react-router-dom'
import { selectUser } from '../features/auth/auth.slice.ts'
import { LogIn, Lock, Mail} from 'lucide-react'


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginInput>({
      resolver: zodResolver(loginSchema)
    })

    const user = useAppSelector(selectUser)
    const navigate = useNavigate()
    console.log(user)
    const dispatch = useAppDispatch()

    const onSubmit = async (data: LoginInput) => {
      try {

        const result = await dispatch(loginUser(data)).unwrap()
        console.log(result)
        navigate('/')

        
      } catch (error) {

        throw new Error(`Error logging in, ${error}`)

      }
         
        }

  return (
    <div className='bg-gradient-to-tr from-blue-cyan-300 to-violet-800 to-flex flex-col items-center gap-4 max-w-[400px] w-full mx-auto shadow-lg p-4 rounded-lg'>
        <div className='w-[80%]'>
           <LogIn />
           <h1 className='text-xl text-white font-bold text-center'>Sign in with email</h1>
           <p className='text-center text-gray-300'>make reading your habit, get access to world class books.</p>
        </div>
        <form 
         className='w-full flex flex-col gap-4 items-center'
         onSubmit={handleSubmit(onSubmit)}>

          <div className='bg-gray-300 p-2 flex items-center gap-2'>

            <Mail />

            <input 
            className='outline-none border-none'

            {...register('email')} 
            placeholder='Email'/>
            {
              errors.email && <p>{errors.email.message}</p>
            }

          </div>

          <div className='bg-gray-300 p-2 flex items-center gap-2'>
            <Lock />
              <input 
            className='outline-none border-none'
            type='password'
            {...register('password')} 
            placeholder='Enter Password'/>
            {
              errors.password && <p>{errors.password.message}</p>
            }
          </div>
            
            

            <button 
            className='w-full rounded-full text-white bg-slate-800 p-2S cursor-pointer'
            type='submit'>Login</button>
        </form>

        <p>
          Don't have an account ?
          <Link to={'/signup'}>create account</Link>
        </p>
    </div>
  )
}

export default LoginForm