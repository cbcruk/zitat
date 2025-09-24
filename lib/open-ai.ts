import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
})

export async function extractKeywords(quoteText: string) {
  const keywordsResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `주어진 문장에서 핵심적인 키워드를 3~5개 추출하세요. 
반드시 한국어 키워드만 반환하고, 키워드들은 콤마(,)로 구분하세요. 
추가 설명이나 불필요한 문장은 절대 포함하지 마세요.`,
      },
      {
        role: 'user',
        content: quoteText,
      },
    ],
    max_tokens: 100,
  })

  const content = keywordsResponse.choices[0]?.message?.content || ''

  return content
    .split(',')
    .map((kw) => kw.trim())
    .filter((kw) => kw.length > 0)
}
