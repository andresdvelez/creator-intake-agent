'use client'

import { useEffect } from 'react'
import { Joyride, STATUS } from 'react-joyride'
import type { EventData, Options, Step } from 'react-joyride'
import { CAMPAIGN } from '@/lib/data/campaign'
import { useReviewWorkspace } from '@/hooks/useReviewWorkspace'
import { TOUR_STEPS, shouldShowTourOnMount, useUIStore } from '@/lib/store/ui.store'
import { CreatorList } from './CreatorList'
import { ReviewPanel } from './ReviewPanel'

const JOYRIDE_STEPS: Step[] = TOUR_STEPS.map((s) => ({
  target: s.target,
  title: s.title,
  content: s.body,
  placement: s.placement,
  skipBeacon: true,
}))

const JOYRIDE_OPTIONS: Partial<Options> = {
  primaryColor: '#ff5a00',
  showProgress: true,
  buttons: ['back', 'close', 'primary', 'skip'],
  closeButtonAction: 'skip',
}

export function ReviewWorkspace() {
  const {
    creators,
    selectedId,
    selectedCreator,
    isReviewing,
    reviewError,
    setSelectedId,
    handleRunReview,
    handleApprove,
    handleReject,
    handleNeedsInfo,
  } = useReviewWorkspace()

  const { tourActive, startTour, endTour } = useUIStore()

  useEffect(() => {
    if (!shouldShowTourOnMount()) return
    const t = setTimeout(startTour, 500)
    return () => clearTimeout(t)
  }, [startTour])

  function handleTourEvent({ status }: EventData) {
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      endTour()
    }
  }

  return (
    <>
      <Joyride
        steps={JOYRIDE_STEPS}
        run={tourActive}
        continuous
        onEvent={handleTourEvent}
        options={JOYRIDE_OPTIONS}
      />

      <div className="flex flex-col md:flex-row h-full gap-2 sm:gap-3">
        <CreatorList creators={creators} selectedId={selectedId} onSelect={setSelectedId} />

        <main className="flex-1 overflow-hidden min-h-0">
          {selectedCreator !== null && (
            <ReviewPanel
              creator={selectedCreator}
              campaign={CAMPAIGN}
              isReviewing={isReviewing}
              reviewError={reviewError}
              onRunReview={handleRunReview}
              onApprove={handleApprove}
              onReject={handleReject}
              onNeedsInfo={handleNeedsInfo}
            />
          )}
        </main>
      </div>

      <button
        onClick={startTour}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#ff5a00] text-white shadow-lg hover:bg-[#e54f00] transition-all hover:scale-110 flex items-center justify-center font-bold text-base sm:text-lg cursor-pointer"
        aria-label="Start product tour"
        title="Help"
      >
        ?
      </button>
    </>
  )
}
