import React from 'react'
import Image from 'next/image'
import { logoutAccount } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

import { useToast } from "@/hooks/use-toast"

function Footer({ user, type = 'desktop' }: FooterProps) {
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = async () => {
        const loggedOut = await logoutAccount()

        if (loggedOut) {
            toast({
                title: "Successful Logout",
                description: "You have been logged out successfully.",
            })
            router.push('/sign-in')
        }
    }

    return (
        <footer className="footer">
            <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <p className="text-xl font-bold text-gray-700">
                    {user.firstName[0]}
                </p>
            </div>

            <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user.firstName} {user.lastName}

                    <p className="text-14 truncate font-normal text-gray-600">
                        {user.email}
                    </p>
                </h1>
            </div>

            <div className="footer_image" onClick={handleLogout}>
                <Image src="/icons/logout.svg" fill alt="jsm" />
            </div>
        </footer>
    )
}

export default Footer