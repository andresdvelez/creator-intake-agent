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
        variant="success"
        size="sm"
        onClick={onApprove}
        disabled={currentStatus === 'approved'}
        className="w-full"
      >
        Approve
      </Button>
      <Button
        variant="warning"
        size="sm"
        onClick={onNeedsInfo}
        disabled={currentStatus === 'needs_info'}
        className="w-full"
      >
        Needs Info
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={onReject}
        disabled={currentStatus === 'rejected'}
        className="w-full"
      >
        Reject
      </Button>
    </div>
  )
}
