// Extracted from https://usehooks-ts.com/react-hook/use-media-query
import { useIsomorphicLayoutEffect } from '@react-spring/web'
import { useEffect, useState } from 'react'
import isClientSide from './isClientSide'

export function useMediaQuery(query) {
  const getMatches = (query) => {
    // Prevents SSR issues
    if (isClientSide()) {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange)

    return () => {
        matchMedia.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}