import Database from 'better-sqlite3'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
})

export const sqlite = new Database('zitat.db')

async function main() {
  const rows = sqlite
    .prepare(
      `SELECT * FROM zitat WHERE uuid = '2aff584e-ab66-487b-9e9d-7d5bbf2c3f66';`
    )
    .all()

  for (const row of rows) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: '',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: row.quote,
            },
          ],
        },
      ],
      response_format: {
        type: 'text',
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    const content = JSON.parse(response.choices[0].message.content)

    const stmt = `UPDATE zitat
        SET quote = ?, keywords = ?
        WHERE uuid = ?`

    try {
      sqlite
        .prepare(stmt)
        .run([
          content.formatted_text,
          JSON.stringify(content.keywords),
          row.uuid,
        ])
    } catch (error) {
      console.error(error)
    }
  }
}
main()
