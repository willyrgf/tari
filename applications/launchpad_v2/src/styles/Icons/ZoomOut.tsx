import * as React from 'react'
import { SVGProps } from 'react'

const SvgZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.316 13.781.73-.171-.73.171Zm0-5.457.73.171-.73-.171Zm15.473 0 .73-.171-.73.171Zm0 5.457.73.171-.73-.171Zm-5.008 5.008-.171-.73.171.73Zm-5.457 0-.171.73.171-.73Zm0-15.473-.171-.73.171.73Zm5.457 0 .171-.73-.171.73ZM20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-6.8-9.728a.75.75 0 0 0 0-1.5v1.5Zm-5.235-1.5a.75.75 0 0 0 0 1.5v-1.5Zm-4.39 3.308a11.198 11.198 0 0 1 0-5.115l-1.46-.342a12.698 12.698 0 0 0 0 5.8l1.46-.343ZM18.06 8.495a11.196 11.196 0 0 1 0 5.115l1.46.342a12.698 12.698 0 0 0 0-5.8l-1.46.343Zm-4.45 9.564a11.196 11.196 0 0 1-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46ZM8.496 4.046a11.198 11.198 0 0 1 5.115 0l.342-1.46a12.698 12.698 0 0 0-5.8 0l.343 1.46Zm0 14.013a5.97 5.97 0 0 1-4.45-4.45l-1.46.343a7.47 7.47 0 0 0 5.568 5.568l.342-1.46Zm5.457 1.46a7.47 7.47 0 0 0 5.568-5.567l-1.46-.342a5.97 5.97 0 0 1-4.45 4.45l.342 1.46ZM13.61 4.046a5.97 5.97 0 0 1 4.45 4.45l1.46-.343a7.47 7.47 0 0 0-5.568-5.567l-.342 1.46Zm-5.457-1.46a7.47 7.47 0 0 0-5.567 5.567l1.46.342a5.97 5.97 0 0 1 4.45-4.45l-.343-1.46Zm8.652 15.28 3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06Zm-3.135-7.563H8.435v1.5h5.235v-1.5Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgZoomOut