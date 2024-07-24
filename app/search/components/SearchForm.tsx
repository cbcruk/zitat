'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams(searchParams)
    const q = formData.get('q') as string

    if (q) {
      params.set('q', q)
    } else {
      params.delete('q')
    }

    const href = `${pathname}?${params.toString()}`

    router.replace(href)
  }

  return (
    <form action={handleSearch} className="flex">
      <input
        type="search"
        name="q"
        defaultValue={searchParams.get('q') || ''}
        autoFocus={true}
        placeholder="내용, 저자 검색"
        title="검색어를 입력해주세요."
        className="block w-full h-12 bg-[color:var(--md-sys-color-surface-variant)] text-base text-inherit p-4 rounded-full border-0"
      />
      <button type="submit"></button>
    </form>
  )
}
