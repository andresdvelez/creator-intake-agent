import type { CreatorStatus } from '@/types'
import { Button } from '@/components/ui/Button'

interface DecisionSectionProps {
  currentStatus: CreatorStatus
  onApprove: () => void
  onReject: () => void
  onNeedsInfo: () => void
}

export function DecisionSection({
  currentStatus,
  onApprove,
  onReject,
  onNeedsInfo,
}: DecisionSectionProps) {
  return (
    <div className="grid grid-cols-3 gap-2" data-tour="decision-buttons">
      <Button
        variant={currentStatus === 'approved' ? 'successFilled' : 'success'}
        size="md"
        onClick={onApprove}
        className="w-full"
      >
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Approve
      </Button>

      <Button
        variant={currentStatus === 'needs_info' ? 'warningFilled' : 'warning'}
        size="md"
        onClick={onNeedsInfo}
        className="w-full"
      >
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
        </svg>
        Needs Info
      </Button>

      <Button
        variant={currentStatus === 'rejected' ? 'dangerFilled' : 'danger'}
        size="md"
        onClick={onReject}
        className="w-full"
      >
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Reject
      </Button>
    </div>
  )
}
