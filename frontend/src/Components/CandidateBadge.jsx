import React from 'react'

const CandidateBadge = (props) => {
    const {candidateEmail, setCandidates, candidates} = props;

    const removeCandidate = () => {
      setCandidates(candidates.filter((email) => email !== candidateEmail));
    };

  return (
    <>
      <span
        id="badge-dismiss-default"
        class="inline-flex items-center m-1 px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded "
      >
        {candidateEmail}
        <button
          type="button"
          class="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 "
          data-dismiss-target="#badge-dismiss-default"
          aria-label="Remove"
          onClick={removeCandidate}
        >
          <svg
            class="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Remove badge</span>
        </button>
      </span>
    </>
  );
}

export default CandidateBadge
