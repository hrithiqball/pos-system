import { Checkbox } from '@pkg/ui/checkbox'
import { Label } from '@pkg/ui/label'
import { Barcode, Clock, Monitor, Package2, Timer } from 'lucide-react'

export function Features() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Checkbox id="enable-shifts" />
        <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
          <div className="flex items-center space-x-2">
            <Clock className="size-4" />
            <span>Enable shifts</span>
          </div>
          <p className="text-xs text-gray-400">Track cash that goes in and out for cashier</p>
        </Label>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox id="enable-shifts" />
        <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
          <div className="flex items-center space-x-2">
            <Timer className="size-4" />
            <span>Time Clock</span>
          </div>
          <p className="text-xs text-gray-400">
            Track employees' clock in and out time to calculate the total hours
          </p>
        </Label>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox id="enable-shifts" />
        <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
          <div className="flex items-center space-x-2">
            <Monitor className="size-4" />
            <span>Display Internal Orders</span>
          </div>
          <p className="text-xs text-gray-400">
            Display orders comes in for displaying internally. E.g. kitchen display
          </p>
        </Label>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox id="enable-shifts" />
        <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
          <div className="flex items-center space-x-2">
            <Monitor className="size-4" />
            <span>Display Cashier Order</span>
          </div>
          <p className="text-xs text-gray-400">
            Display order for client to see. E.g. cashier display
          </p>
        </Label>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox id="enable-shifts" />
        <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
          <div className="flex items-center space-x-2">
            <Package2 className="size-4" />
            <span>Stock Notifications</span>
          </div>
          <p className="text-xs text-gray-400">
            Emails to notify when stock is low, or when stock is out
          </p>
        </Label>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox id="enable-shifts" />
        <Label className="flex flex-col space-y-2" htmlFor="enable-shifts">
          <div className="flex items-center space-x-2">
            <Barcode className="size-4" />
            <span>Barcode Embedded Item</span>
          </div>
          <p className="text-xs text-gray-400">Tags product with barcode</p>
        </Label>
      </div>
    </div>
  )
}
