import { Input } from '@pkg/ui/input'
import { Search } from 'lucide-react'

export function BrandSearch() {
  return (
    <div className="flexcenter space-x-4">
      <span>POS</span>
      <Input className="min-w-96" startIcon={Search} placeholder="Search" />
    </div>
  )
}
