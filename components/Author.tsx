type Props = {
  author?: string
}

function Author({ author }: Props) {
  if (!author) {
    return null
  }

  return (
    <p className="Author">
      <style jsx>{`
        .Author {
          padding-top: 1.618rem;
          margin-top: auto;
        }
      `}</style>
      -{author}
    </p>
  )
}

export default Author
