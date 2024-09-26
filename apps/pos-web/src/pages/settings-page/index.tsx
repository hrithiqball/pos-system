import { useState } from 'react'
import { Checkbox } from '@pkg/ui/checkbox'
import { Label } from '@pkg/ui/label'
import { InputTags } from '@pkg/ui/select-tag-input'

export function SettingsPage() {
  const [itemTypeOptions, setItemTypeOptions] = useState<string[]>([])

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-semibold text-2xl">Settings</h1>
      <div className="flex items-center space-x-2">
        <Checkbox id="enable-cashier" />
        <label
          htmlFor="enable-cashier"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable cashier
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="enable-lhdn" />
        <Label htmlFor="enable-lhdn">Enable LHDN</Label>
      </div>
      shifts time clock open tickets kitchen counters customer displays dining options low stock
      notifications negative stock alerts barcodes
      <span>role: owner, admin, manager, cashier</span>
      <span>customised reciepts</span>
      <span>taxes</span>
      <InputTags
        value={itemTypeOptions}
        onChange={setItemTypeOptions}
        placeholder="Add item type"
      />
    </div>
  )
}
