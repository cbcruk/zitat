import { ComponentProps } from 'react'
import Balancer from 'react-wrap-balancer'

type Props = ComponentProps<'p'>

function Quote({ children, ...props }: Props) {
  return (
    <Balancer>
      <p
        className='my-[0.702rem] whitespace-pre-line break-keep text-[2.618rem] data-[is-long="true"]:text-[1.618rem];'
        {...props}
      >
        {children}
      </p>
    </Balancer>
  )
}

export default Quote
