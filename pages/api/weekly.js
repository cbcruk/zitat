import mem from 'mem'

const memoized = mem(
  async () => {
    const response = await fetch(
      `${process.env.SPREADSHEET_URL}/exec?type=weekly`
    )
    const data = await response.json()

    return data
  },
  {
    maxAge: 3600000,
  }
)

async function weekly(_req, res) {
  const data = await memoized()

  res.json(data)
}

export default weekly
