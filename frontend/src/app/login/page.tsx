import { getSession } from "@/actions"
import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation"

const LoginPage = async () => {  
  const session = await getSession()

  if(session.isLoggedIn){
    redirect("/")
  }
  return (
    <div className="login flex justify-center items-center">
      <LoginForm/>
    </div>
  )
}

export default LoginPage