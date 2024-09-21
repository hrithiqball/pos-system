import { useNavigate } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@pkg/ui/tabs'

import { Menu } from './components/menu'
import { Summary } from './components/summary'

export function HomePage() {
  const navigate = useNavigate()

  const types = ['main', 'breakfast', 'lunch', 'beverage', 'dessert', 'snack main']

  function handleChangeType(type: string) {
    return () => {
      navigate(`/${type}`)
    }
  }

  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Tabs defaultValue="main">
          <TabsList>
            {types.map(type => (
              <TabsTrigger key={type} value={type} onClick={handleChangeType(type)}>
                {type
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Menu />
      </div>
      <div className="min-w-96 h-full pb-4">
        <Summary />
      </div>
    </div>
  )
}
