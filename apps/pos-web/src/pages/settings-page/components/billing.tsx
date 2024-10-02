import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@pkg/ui/card'
import { Checkbox } from '@pkg/ui/checkbox'
import { Input } from '@pkg/ui/input'
import { Label } from '@pkg/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@pkg/ui/select'
import { Banknote, QrCode } from 'lucide-react'

export function Billing() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-semibold text-xl">Payment Type</h1>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-2">
              <QrCode />
              <span>QR Payment</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" />
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-2">
            <Checkbox id="displayQr" />
            <Label htmlFor="displayQr">Display QR on customer display</Label>
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-2">
              <Banknote />
              <span>Bank Transfer</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="bank">Bank</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cimb">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/bank-brand/cimb.svg"
                      alt="cimb-logo"
                      className="w-12 p-2 bg-red-950 dark:bg-transparent"
                    />
                    <span>CIMB</span>
                  </div>
                </SelectItem>
                <SelectItem value="maybank2u">
                  <div className="flex items-center space-x-2">
                    <img src="/bank-brand/maybank.svg" alt="maybank-logo" className="w-12 p-2" />
                    <span>Maybank2U</span>
                  </div>
                </SelectItem>
                <SelectItem value="maybank2e">
                  <div className="flex items-center space-x-2">
                    <img src="/bank-brand/maybank.svg" alt="maybank-logo" className="w-12 p-2" />
                    <span>Maybank2E</span>
                  </div>
                </SelectItem>
                <SelectItem value="bankIslam">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/bank-brand/bank-islam.svg"
                      alt="bank-islam-logo"
                      className="w-12 p-2 dark:bg-white"
                    />
                    <span>Bank Islam</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" type="text" placeholder="e.g. 12338472399384" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-2">
            <Checkbox id="displayAccount" />
            <Label htmlFor="displayAccount">Display account number on customer display</Label>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
