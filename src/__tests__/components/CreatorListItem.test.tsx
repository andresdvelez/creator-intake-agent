import { describe, it, expect, mock } from 'bun:test'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreatorListItem } from '@/components/review/CreatorListItem'
import type { Creator } from '@/types'

const baseCreator: Creator = {
  id: '1',
  creatorName: 'Mia Lopez',
  handle: '@miaglow',
  platform: 'TikTok',
  followers: 820000,
  engagementRate: 4.9,
  audienceSummary: 'Gen Z beauty fans',
  contentStyle: 'GRWM videos',
  applicationMessage: 'Love your brand!',
  pastBrandDeals: ['e.l.f.'],
  status: 'pending',
}

describe('CreatorListItem', () => {
  it('renders the creator name', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.getByText('Mia Lopez')).toBeInTheDocument()
  })

  it('renders the handle', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.getByText('@miaglow')).toBeInTheDocument()
  })

  it('renders the platform', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.getByText('TikTok')).toBeInTheDocument()
  })

  it('formats 820000 followers as "820K"', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.getByText('820K')).toBeInTheDocument()
  })

  it('formats 1200000 followers as "1.2M"', () => {
    render(
      <CreatorListItem
        creator={{ ...baseCreator, followers: 1200000 }}
        isSelected={false}
        onSelect={mock(() => {})}
      />
    )
    expect(screen.getByText('1.2M')).toBeInTheDocument()
  })

  it('formats small follower count with no suffix', () => {
    render(
      <CreatorListItem
        creator={{ ...baseCreator, followers: 500 }}
        isSelected={false}
        onSelect={mock(() => {})}
      />
    )
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('shows initials in avatar', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.getByText('ML')).toBeInTheDocument()
  })

  it('shows "Pending" status badge', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows "Approved" status badge', () => {
    render(
      <CreatorListItem
        creator={{ ...baseCreator, status: 'approved' }}
        isSelected={false}
        onSelect={mock(() => {})}
      />
    )
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })

  it('calls onSelect with the creator id when clicked', async () => {
    const onSelect = mock((_id: string) => {})
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('1')
  })

  it('shows aiReview fit score when review is present', () => {
    const creatorWithReview: Creator = {
      ...baseCreator,
      aiReview: {
        fitScore: 9,
        recommendation: 'approve',
        reasoning: 'Great fit',
        risks: [],
        missingInfo: [],
        suggestedReply: 'Welcome!',
      },
    }
    render(
      <CreatorListItem creator={creatorWithReview} isSelected={false} onSelect={mock(() => {})} />
    )
    expect(screen.getByText('9/10')).toBeInTheDocument()
  })

  it('does not show fit score when no aiReview', () => {
    render(<CreatorListItem creator={baseCreator} isSelected={false} onSelect={mock(() => {})} />)
    expect(screen.queryByText(/\/10/)).not.toBeInTheDocument()
  })
})
