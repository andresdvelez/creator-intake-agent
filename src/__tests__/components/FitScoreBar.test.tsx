import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { FitScoreBar } from '@/components/review/FitScoreBar'

describe('FitScoreBar', () => {
  it('displays the score', () => {
    render(<FitScoreBar score={7} />)
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('displays the /10 denominator', () => {
    render(<FitScoreBar score={7} />)
    expect(screen.getByText('/10')).toBeInTheDocument()
  })

  it('shows "Strong fit" for score ≥ 8', () => {
    render(<FitScoreBar score={8} />)
    expect(screen.getByText('Strong fit')).toBeInTheDocument()
  })

  it('shows "Strong fit" for score 10', () => {
    render(<FitScoreBar score={10} />)
    expect(screen.getByText('Strong fit')).toBeInTheDocument()
  })

  it('shows "Good fit" for score 6', () => {
    render(<FitScoreBar score={6} />)
    expect(screen.getByText('Good fit')).toBeInTheDocument()
  })

  it('shows "Good fit" for score 7', () => {
    render(<FitScoreBar score={7} />)
    expect(screen.getByText('Good fit')).toBeInTheDocument()
  })

  it('shows "Partial fit" for score 4', () => {
    render(<FitScoreBar score={4} />)
    expect(screen.getByText('Partial fit')).toBeInTheDocument()
  })

  it('shows "Partial fit" for score 5', () => {
    render(<FitScoreBar score={5} />)
    expect(screen.getByText('Partial fit')).toBeInTheDocument()
  })

  it('shows "Poor fit" for score 3', () => {
    render(<FitScoreBar score={3} />)
    expect(screen.getByText('Poor fit')).toBeInTheDocument()
  })

  it('shows "Poor fit" for score 0', () => {
    render(<FitScoreBar score={0} />)
    expect(screen.getByText('Poor fit')).toBeInTheDocument()
  })

  it('renders a progress bar element', () => {
    const { container } = render(<FitScoreBar score={7} />)
    // The progress bar is a div with inline width style
    const bars = container.querySelectorAll('[style*="width"]')
    expect(bars.length).toBeGreaterThan(0)
  })
})
