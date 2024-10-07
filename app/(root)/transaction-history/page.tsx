import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts } from '@/lib/actions/bank.actions'
import { formatAmount } from '@/lib/utils'
import TransactionTable from '@/components/TransactionTable'
import { mokTransactions } from '@/constants/transactions'

async function TransactionHistory({ searchParams: { id, page } }: SearchParamProps) {
  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedIn?.$id })

  if (!accounts) return
  const accountsData = accounts?.data

  const account = accounts.data[0]

  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox title="Transaction History" subtext="See you bank details and transactions" />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account.name}
            </h2>
            <p className="text-14 text-blue-25">
              {account.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">
              Current Balance:
            </p>
            <p className="text-24 text-center font-bold">{formatAmount(account.currentBalance)}</p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionTable transactions={mokTransactions} />
        </section>
      </div>
    </section>
  )
}

export default TransactionHistory