export function AiReviewPlaceholder() {
  return (
    <div className="bg-gray-50 rounded-2xl ring-1 ring-black/[0.04] px-5 py-10 flex flex-col items-center gap-2.5 text-center">
      <div className="h-10 w-10 rounded-full bg-white ring-1 ring-black/[0.06] flex items-center justify-center mb-0.5">
        <svg
          className="h-5 w-5 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-400">No AI analysis yet</p>
      <p className="text-xs text-gray-300 max-w-[220px] leading-relaxed">
        Run AI Review above to get a fit score, recommendation, risks, and suggested reply.
      </p>
    </div>
  )
}
