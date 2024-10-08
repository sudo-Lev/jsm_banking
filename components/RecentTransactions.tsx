import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionTable from './TransactionTable'
import { mokTransactions } from '@/constants/transactions'

function RecentTransactions({ accounts, transactions = mokTransactions, appwriteItemId, page = 1 }: RecentTransactionsProps) {

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transations-label">
                    Recent Transactions
                </h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className="view-all-btn">
                    View all
                </Link>
            </header>
            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId} className="">
                            <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId} />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {accounts.map((account: Account) => (
                    <TabsContent value={account.appwriteItemId} key={account.id} className="space-y-4">
                        <BankInfo account={account} appwriteItemId={appwriteItemId} type="full" />

                        <TransactionTable transactions={transactions} />
                    </TabsContent>
                ))}

            </Tabs>

        </section>
    )
}

export default RecentTransactions