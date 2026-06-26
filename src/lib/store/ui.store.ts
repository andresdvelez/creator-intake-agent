'use client'

import { create } from 'zustand'

export interface TourStep {
  target: string
  title: string
  body: string
  placement: 'right' | 'bottom' | 'top' | 'left'
}

export const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="creator-list"]',
    title: 'Creator Applications',
    body: 'All incoming creator applications are listed here. Each card shows their current status, platform, and follower count. Click any creator to open their profile.',
    placement: 'right',
  },
  {
    target: '[data-tour="creator-profile"]',
    title: 'Creator Profile',
    body: 'Review the creator\'s key metrics — followers, engagement rate, audience demographics, content style, and past brand partnerships — all in one place.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="application-section"]',
    title: 'Application & Campaign Fit',
    body: 'Read the creator\'s pitch for this campaign and quickly compare it against the campaign goal and platform requirements.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="run-review"]',
    title: 'AI-Powered Analysis',
    body: 'Click "Run AI Review" to get an instant fit score (0–10), flagged risks, missing information, and a ready-to-send reply draft — grounded strictly in the provided data.',
    placement: 'top',
  },
  {
    target: '[data-tour="decision-buttons"]',
    title: 'Make Your Decision',
    body: 'After reviewing the AI analysis, approve the creator, request more information, or reject — directly from this panel.',
    placement: 'top',
  },
]

const STORAGE_KEY = 'creator-intake-tour-done'

interface UIStore {
  tourActive: boolean
  tourStep: number
  startTour: () => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  tourActive: false,
  tourStep: 0,

  startTour: () => set({ tourActive: true, tourStep: 0 }),

  nextStep: () =>
    set((state) => {
      const isLast = state.tourStep >= TOUR_STEPS.length - 1
      if (isLast) {
        if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
        return { tourActive: false }
      }
      return { tourStep: state.tourStep + 1 }
    }),

  prevStep: () => set((state) => ({ tourStep: Math.max(0, state.tourStep - 1) })),

  endTour: () => {
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
    set({ tourActive: false })
  },
}))

export function shouldShowTourOnMount(): boolean {
  if (typeof window === 'undefined') return false
  return !localStorage.getItem(STORAGE_KEY)
}
