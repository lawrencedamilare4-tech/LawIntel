import { WalletConnectButton } from '@/components/web3/WalletConnectButton'

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-surface-raised flex items-center justify-between px-4 lg:px-6">
      <div className="text-xs text-text-muted hidden lg:block">LawIntel Terminal</div>
      <div className="lg:hidden">
        {/* The hamburger is in the Sidebar component, but we need a placeholder for spacing */}
      </div>
      <WalletConnectButton />
    </header>
  )
}