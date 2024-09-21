import { useParams } from 'react-router-dom'
import { Card } from '@pkg/ui/card'

import { DUMMY_MENU } from './dummy-menu'

export function Menu() {
  const { type = 'main' } = useParams()

  return (
    <div className="overflow-y-auto flex-1 relative">
      <span>{type}</span>
      <div className="p-4 grid grid-cols-5 gap-8">
        {DUMMY_MENU.map((menu, index) => (
          <Card key={index} className="w-52 cursor-pointer">
            <img src={menu.image} alt={menu.name} />
            <div className="mt-2 px-4 pb-4">
              <h3 className="text-lg font-bold">{menu.name}</h3>
              <p className="text-gray-600">${menu.price.toFixed(2)}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
