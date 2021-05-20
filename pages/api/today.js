import mem from 'mem'

const memoized = mem(
  async () => {
    const response = await fetch(
      `${process.env.SPREADSHEET_URL}/exec?type=today`
    )
    const data = await response.json()

    return data
  },
  {
    maxAge: 3600000,
  }
)

async function today(_req, res) {
  const data = await memoized()

  res.json(data)
}

export default today
