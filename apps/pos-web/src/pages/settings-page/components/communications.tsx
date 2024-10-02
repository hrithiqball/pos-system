import { useState } from 'react'
import { Button } from '@pkg/ui/button'
import { Checkbox } from '@pkg/ui/checkbox'
import { Input } from '@pkg/ui/input'
import { Label } from '@pkg/ui/label'
import { SelectBox } from '@pkg/ui/select-box'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@pkg/ui/table'

export function Communications() {
  const [emailTarget, setEmailTarget] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState('')
  const [valueSelectBox, setValueSelectBox] = useState<string[]>([])

  const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'two', label: 'Supervisor' },
    { value: 'cashier', label: 'Cashier' }
  ]

  function addEmail() {
    if (currentEmail.trim() !== '') {
      setEmailTarget(prev => [...prev, currentEmail])
      setCurrentEmail('')
    }
  }

  function handleSelectChange(values: string[] | string) {
    if (Array.isArray(values)) {
      setValueSelectBox(values)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Checkbox id="lowStockNotifications" />
        <Label htmlFor="lowStockNotifications">Send low stock notifications</Label>
      </div>

      <h1 className="text-lg font-semibold">Role Notifications</h1>
      <SelectBox multiple options={options} value={valueSelectBox} onChange={handleSelectChange} />

      <h1 className="text-lg font-semibold">Account</h1>
      <div className="flex flex-col space-y-3">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center space-x-4">
          <Input
            id="email"
            type="email"
            value={currentEmail}
            onChange={e => setCurrentEmail(e.target.value)}
          />
          <Button onClick={addEmail}>Add</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Emails</TableCaption>
        <TableBody>
          {emailTarget.map(email => (
            <TableRow key={email}>
              <TableCell>{email}</TableCell>
              <TableCell>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
