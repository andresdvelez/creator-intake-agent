import { Header } from '@/components/layout/Header'
import { ReviewWorkspace } from '@/components/review/ReviewWorkspace'

export default function Page() {
  return (
    <div className="h-[100dvh] bg-[#f0f2f5] overflow-hidden flex flex-col gap-2 p-2 sm:gap-3 sm:p-3">
      <Header />
      <div className="flex-1 overflow-hidden min-h-0">
        <ReviewWorkspace />
      </div>
    </div>
  )
}
