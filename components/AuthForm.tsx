'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { authFormSchema, formSchema } from '@/lib/utils'
import {
  Form,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { signUp, signIn } from '@/lib/actions/user.actions'

import CustomInput from './CustomInput'

function AuthForm({ type }: { type: string }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      if (type === 'sign-up') {
        const newUser = await signUp(data)

        setUser(newUser)
      }
      if (type === 'sign-in') {
        const response = await signIn({ email: data.email, password: data.password })
        if (response) {
          router.push('/')
        }
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={24} height={24} alt="Horizon logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {user ? 'Link your account to get started' : 'Please enter your details to continue'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* PLAID LINK */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    {/* FIRST NAME */}
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter you first name"
                    />
                    {/* LAST NAME */}
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter you last name"
                    />
                  </div>
                  {/* ADDRESS */}
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter you address"
                  />
                  {/* CITY */}
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter you city"
                  />
                  <div className="flex gap-4">
                    {/* STATE */}
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Ex: California"
                    />
                    {/* POSTAL CODE */}
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Ex: 12345"
                    />
                  </div>
                  <div className="flex gap-4">
                    {/* DATE OF BIRTH */}
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    {/* SSN */}
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Enter you SSN"
                    />
                  </div>
                </>
              )}
              {/* EMAIL */}
              <CustomInput
                control={form.control}
                name='email'
                label="Email"
                placeholder="Enter you email"
              />
              {/* PASSWORD */}
              <CustomInput
                control={form.control}
                name='password'
                label="Password"
                placeholder="Enter you password"
              />
              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} className="form-btn" type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link className="form-link" href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm