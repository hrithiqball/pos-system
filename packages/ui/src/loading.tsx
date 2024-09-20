import { Loader2 } from 'lucide-react'

type LoadingComponentProps = {
  message?: string
}

export function LoadingComponent({ message }: LoadingComponentProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center">
        <Loader2 className="size-8 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  )
}
