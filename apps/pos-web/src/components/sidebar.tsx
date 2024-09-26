import { Link } from 'react-router-dom'
import { Button } from '@pkg/ui/button'
import {
  Armchair,
  DollarSign,
  LayoutDashboard,
  Package2,
  PieChart,
  Settings2,
  Star,
  User2
} from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex flex-col space-y-4 px-4">
      <Button size="icon" asChild>
        <Link to="/">
          <LayoutDashboard />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/customers">
          <User2 />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/table">
          <Armchair />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/cashier">
          <DollarSign />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/inventory">
          <Package2 />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/loyalty">
          <Star />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/reports">
          <PieChart />
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link to="/settings">
          <Settings2 />
        </Link>
      </Button>
    </div>
  )
}
