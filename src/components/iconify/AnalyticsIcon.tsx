import { SVGProps } from 'react'

function AnalyticsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <path
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12a9.97 9.97 0 0 1 3-7.141"
          opacity={0.4}
        ></path>
        <path d="M5 12a7 7 0 1 0 7-7" opacity={0.7}></path>
        <path d="M12 16a4 4 0 0 0 0-8"></path>
      </g>
    </svg>
  )
}

export default AnalyticsIcon
