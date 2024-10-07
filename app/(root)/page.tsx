import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts, getAccount } from '@/lib/actions/bank.actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import RecentTransactions from '@/components/RecentTransactions'


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedIn?.$id })
  const currentPage = Number(page as string) || 1

  if (!accounts) return
  const accountsData = accounts?.data
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />

        </header>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="w-full flex justify-end">
              <Button className="flex items-center justify-center w-[100px] shadow-neutral-400 hover:bg-blue-500 hover:text-white hover:scale-125 border-transparent bg-transparent transition duration-300 ease-in-out" variant="outline">Congrats! 🎉</Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogOverlay className="bg-slate-950 opacity-50" />
          <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Here is some news !!!</AlertDialogTitle>
              <AlertDialogDescription>
                Yesterday you achieved a new milestone. Congratulations! 👏
                Check you cabinet for more details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="hover:bg-blue-500 hover:text-white hover:scale-125 border-transparent bg-transparent transition duration-300 ease-in-out">
                Thanks!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <RecentTransactions page={currentPage} appwriteItemId={appwriteItemId} accounts={accountsData} transactions={account?.transactions} />
      </div>


      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home