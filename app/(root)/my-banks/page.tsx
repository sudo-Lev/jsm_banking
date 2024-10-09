import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts } from '@/lib/actions/bank.actions'
import BankCard from '@/components/BankCard'

async function MyBanks() {

  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedIn?.$id })
  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox title="My Bank Accounts" subtext="Manage your bankings activities" />

        <div className="space-y-4">
          <h2 className="header-2">
            Your Cards
          </h2>

          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((account: Account) => (
              <BankCard key={account.id} account={account} userName={loggedIn?.firstName} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks