function Author({ author }) {
  return (
    <p className="Author">
      <style jsx>{`
        .Author {
          padding-top: 1.618rem;
          margin-top: auto;
          text-align: right;
        }
      `}</style>
      -{author}
    </p>
  )
}

export default Author
