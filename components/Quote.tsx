import { ComponentProps } from 'react'

type Props = ComponentProps<'p'>

function Quote({ children, ...props }: Props) {
  return (
    <p
      className='text-[2.618rem] data-[is-long="true"]:text-[1.618rem] text-balance break-keep overflow-hidden text-ellipsis whitespace-pre-wrap'
      {...props}
    >
      {children}
    </p>
  )
}

export default Quote
