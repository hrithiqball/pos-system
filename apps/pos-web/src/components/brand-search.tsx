import { Input } from '@pkg/ui/input'
import { Search } from 'lucide-react'

export function BrandSearch() {
  return (
    <div className="flexcenter space-x-4">
      <img src="/public/brand.svg" alt="POS" className="size-8" />
      <Input className="min-w-96" startIcon={Search} placeholder="Search" />
    </div>
  )
}
