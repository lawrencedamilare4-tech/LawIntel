import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from '@/app/Landing'
import { AppShell } from '@/components/layout/AppShell'
import { AuthGuard } from '@/components/web3/AuthGuard'
import { Dashboard } from '@/app/Dashboard'
import { AnalyzePage } from '@/app/Analyze'
import { WalletPage } from '@/app/Wallet'
import { ContractPage } from '@/app/Contract'
import { HistoryPage } from '@/app/History'
import { ProfilePage } from '@/app/Profile'
import { BatchBalancePage } from './app/BatchBalance'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          element={
            <AuthGuard>
              <AppShell />
            </AuthGuard>
          }
        >
          <Route path="/batch-balance" element={<BatchBalancePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/contract" element={<ContractPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}