import { useState } from 'react'
import { Checkbox } from '@pkg/ui/checkbox'
import { Label } from '@pkg/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@pkg/ui/select'

export function Permissions() {
  const dummyRoleOptions = ['Manager', 'Employee', 'Intern', 'Cashier']
  const [role, setRole] = useState<string>()

  // TODO: fetch permissions from the server based on the selected role

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-lg font-semibold">Roles</h1>
      <Select onValueChange={setRole}>
        <SelectTrigger>
          <SelectValue placeholder="Select a role to modify permission" />
        </SelectTrigger>
        <SelectContent>
          {dummyRoleOptions.map(role => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {role && (
        <div className="flex items-center space-x-4">
          <Checkbox id="enable-shifts" />
          <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
            <div className="flex items-center space-x-2">
              <span>Display Cashier Order</span>
            </div>
            <p className="text-xs text-gray-400">
              Display order for client to see. E.g. cashier display
            </p>
          </Label>
        </div>
      )}
    </div>
  )
}
