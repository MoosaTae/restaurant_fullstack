'use client'
 
import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'
 
export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="john@example.com" />
      </div>
      {state.errors.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state.errors.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Sign up'}
      </button>
    </form>
  )
}