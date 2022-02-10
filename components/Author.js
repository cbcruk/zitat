// @ts-check

/**
 *
 * @param {object} props
 * @param {string=} props.author
 */
function Author({ author }) {
  if (!author) {
    return null
  }

  return (
    <p className="Author">
      <style jsx>{`
        .Author {
          padding-top: 1.618rem;
          margin-top: auto;
          font-style: italic;
        }
      `}</style>
      -{author}
    </p>
  )
}

export default Author
