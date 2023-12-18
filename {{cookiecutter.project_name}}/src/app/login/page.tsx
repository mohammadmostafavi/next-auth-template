import getConfig from "next/config"
import LoginForm from "@/components/loginForm"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const { publicRuntimeConfig } = getConfig()

export const metadata = {
  title: publicRuntimeConfig.title + ' - Login',
  description: 'Login to your account',
}



export default function LoginPage() {

  return (
    <section>
        <LoginForm/>
    </section>
  )
}
