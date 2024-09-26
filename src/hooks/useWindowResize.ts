import { useEffect, useState } from 'react'

function debounce(func: () => void, timeout: number) {
  let timer: NodeJS.Timeout
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, timeout)
  }
}

export default function useWindowResize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth)
    }

    const debounceResize = debounce(handleResize, 1000)

    window.addEventListener('resize', debounceResize)

    return () => {
      window.removeEventListener('resize', debounceResize)
    }
  }, [])

  return windowWidth
}
