import { Card, CardContent, CardHeader, CardTitle } from '@pkg/ui/card'

export function Invoices() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Invoices</h1>
      <Card>
        <CardHeader>
          <CardTitle>Invoice Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col bg-white text-black p-4 min-w-96 min-h-[600px]">
            <span>&lt;&lt; brand logo here &gt;&gt;</span>
            <span>&lt;&lt; brand name here &gt;&gt;</span>

            <div className="flex justify-between mt-4">
              <div>
                <span>Invoice #</span>
                <span>&lt;&lt; invoice number here &gt;&gt;</span>
              </div>
              <div>
                <span>Date</span>
                <span>&lt;&lt; invoice date here &gt;&gt;</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
