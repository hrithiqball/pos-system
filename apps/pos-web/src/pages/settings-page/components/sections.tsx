import { useParams } from 'react-router-dom'

import { Billing } from './billing'
import { Communications } from './communications'
import { Display } from './display'
import { Features } from './features'
import { Inventory } from './inventory'
import { Invoices } from './invoices'
import { Permissions } from './permissions'

export function Sections() {
  const { type } = useParams()

  switch (type) {
    case 'permission':
      return <Permissions />

    case 'feature':
      return <Features />

    case 'bill':
      return <Billing />

    case 'invoices':
      return <Invoices />

    case 'comms':
      return <Communications />

    case 'display':
      return <Display />

    case 'inventory':
      return <Inventory />

    default:
      return <Permissions />
  }
}
