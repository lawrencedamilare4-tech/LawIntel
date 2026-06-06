import { NavLink } from 'react-router-dom'
import {
  Shield, LayoutDashboard, Search, Wallet, FileText, History, User,
  List,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analyze', icon: Search, label: 'Analyze' },
  { to: '/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/contract', icon: FileText, label: 'Contract' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/batch-balance', icon: List, label: 'Batch' }
]

export function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-0.5 px-1 py-1 text-xs transition-colors
    ${isActive ? 'text-accent-blue' : 'text-text-muted hover:text-text-primary'}`

  return (
    <>
      {/* ========== DESKTOP SIDEBAR – no fixed height ========== */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-raised border-r border-border">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent-blue" />
          <span className="font-semibold text-sm">LawIntel</span>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm rounded transition-colors ${
                  isActive
                    ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-raised border-t border-border flex items-center justify-around py-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={linkClass}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}