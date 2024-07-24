'use client'

import { ComponentProps } from 'react'
import IconContentCopy from './icons/IconContentCopy'

type Props = ComponentProps<'button'> & {
  text: string
}

export function Fab({ text }: Props) {
  return (
    <button
      className="fixed right-[1.618rem] bottom-[calc(80px+1.618rem)] flex items-center justify-center w-[56px] h-[56px] border-0 rounded-[16px] bg-[var(--md-sys-color-primary)] shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)] drop-shadow-[0px_1px_3px_rgba(0,0,0,0.3)] cursor-pointer"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
        } catch (error) {
          console.error(error)
        }
      }}
      aria-label="본문 내용 복사하기"
    >
      <IconContentCopy className="text-[var(--md-sys-color-on-primary-light)] dark:text-[var(--md-sys-color-on-primary-container-light)]" />
    </button>
  )
}
