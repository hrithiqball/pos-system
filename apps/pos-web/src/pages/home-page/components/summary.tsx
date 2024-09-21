import { Button } from '@pkg/ui/button'
import { Card, CardContent, CardHeader } from '@pkg/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@pkg/ui/table'
import { Minus, Plus } from 'lucide-react'

export function Summary() {
  const dummyOrders = [
    {
      id: 1,
      name: 'Nasi Lemak',
      price: 12.5,
      quantity: 1
    },
    {
      id: 2,
      name: 'Teh Tarik',
      price: 2.5,
      quantity: 2
    },
    {
      id: 3,
      name: 'Roti Canai',
      price: 1.5,
      quantity: 1
    }
  ]

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flexcenter">
          <Button>Add Customer</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-col flex-1 h-full">
          <hr />
          <div className="flex pt-4 flex-col flex-1">
            <div className="flex flex-1">
              <div className="flex flex-col flex-1">
                {dummyOrders.map(order => (
                  <div key={order.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{order.quantity}</span>
                      <div className="space-x-1">
                        <Button className="size-6" variant="outline" size="icon">
                          <Plus className="size-4 text-green-500" />
                        </Button>
                        <Button className="size-6" variant="outline" size="icon">
                          <Minus className="size-4 text-red-500" />
                        </Button>
                      </div>
                      <span>{order.name}</span>
                    </div>
                    <span>RM {order.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">RM 123.23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">RM 14.65</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flexcenter space-x-2">
                <Button className="flex-1">Hold</Button>
                <Button className="flex-1">Proceed</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
