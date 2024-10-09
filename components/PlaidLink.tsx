'use client'

import React from 'react'
import { Button } from './ui/button'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '../lib/actions/user.actions'
import Image from 'next/image'

function PlaidLink({ user, variant }: PlaidLinkProps) {
	const [token, setToken] = useState('')
	const router = useRouter()

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user)

			setToken(data?.linkToken)
		}

		getLinkToken()
	}, [user])

	const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
		await exchangePublicToken({
			publicToken: public_token,
			user,
		})

		router.push('/')
	}, [user])

	const config: PlaidLinkOptions = {
		token,
		onSuccess
	}

	const { open, ready } = usePlaidLink(config)

	return (
		<>
			{
				variant === 'primary' ? (
					<Button
						onClick={() => { open() }}
						disabled={!ready}
						className="plaidlink-primary"
					>
						Connect bank
					</Button>
				) : variant === 'ghost' ? (
					<Button variant="ghost" onClick={() => open()} className="plaidlink-ghost">
						<Image src="/icons/connect-bank.svg" alt="Connect Bank" width={20} height={20} />
						<p className="hidden text-[16px] font-semibold text-black-2">
							Connect bank
						</p>
					</Button>
				) : (
					<a onClick={() => open()} className="sidebar-link">
						<Image src="/icons/connect-bank.svg" alt="Connect Bank" width={20} height={20} />
						<p className="text-[16px] font-semibold text-black-2">
							Connect bank
						</p>
					</a>
				)
			}
		</>
	)
}

export default PlaidLink