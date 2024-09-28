import { Link, useParams } from 'react-router-dom'
import { Button } from '@pkg/ui/button'

import { Sections } from './components/sections'

export function SettingsPage() {
  const { type = 'permission' } = useParams()

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-2xl">Settings</h1>
      <div className="flex">
        <div className="flex flex-col space-y-4 p-4">
          <Button variant="ghost" asChild>
            <Link
              to="/settings/permission"
              className={type === 'permission' ? 'text-blue-500' : ''}
            >
              Permissions
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings/feature" className={type === 'feature' ? 'text-blue-500' : ''}>
              Features
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings/bill" className={type === 'bill' ? 'text-blue-500' : ''}>
              Billing
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings/invoices" className={type === 'invoices' ? 'text-blue-500' : ''}>
              Invoices
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings/comms" className={type === 'comms' ? 'text-blue-500' : ''}>
              Communications
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings/display" className={type === 'display' ? 'text-blue-500' : ''}>
              Display
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings/inventory" className={type === 'inventory' ? 'text-blue-500' : ''}>
              Inventory
            </Link>
          </Button>
        </div>
        <div className="p-4">
          <Sections />
        </div>
      </div>
    </div>
  )
}
