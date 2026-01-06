#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { createClient, Client } from '@libsql/client'
import { randomUUID } from 'crypto'
import Fuse, { FuseResult } from 'fuse.js'
import path from 'path'
import { fileURLToPath } from 'url'

interface AddQuoteArgs {
  quote: string
  author: string
}

interface SearchQuotesArgs {
  query: string
  limit?: number
}

interface ListRecentQuotesArgs {
  limit?: number
}

interface QuoteRecord {
  uuid: string
  date: string
  quote: string
  author: string
}

class QuoteServer {
  private server: Server
  private db: Client
  private fuse: Fuse<QuoteRecord> | null = null
  private quotes: QuoteRecord[] = []

  constructor() {
    this.server = new Server(
      {
        name: 'zitat-quote-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    )

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const dbPath = path.join(__dirname, 'zitat.db')

    this.db = createClient({
      url: `file:${dbPath}`,
    })
    this.setupToolHandlers()
  }

  private async initializeFuseIndex(): Promise<void> {
    const result = await this.db.execute(
      'SELECT uuid, date, quote, author FROM zitat'
    )

    this.quotes = result.rows.map((row) => ({
      uuid: row[0] as string,
      date: row[1] as string,
      quote: row[2] as string,
      author: row[3] as string,
    }))

    this.fuse = new Fuse(this.quotes, {
      keys: [
        { name: 'quote', weight: 0.7 },
        { name: 'author', weight: 0.3 },
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    })
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'add_quote',
          description: 'Add a new quote to the zitat database',
          inputSchema: {
            type: 'object',
            properties: {
              quote: {
                type: 'string',
                description: 'The quote text',
              },
              author: {
                type: 'string',
                description: 'The author of the quote',
              },
            },
            required: ['quote', 'author'],
          },
        },
        {
          name: 'search_quotes',
          description: 'Search for quotes in the database',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query for quotes',
              },
              limit: {
                type: 'number',
                description: 'Maximum number of results',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'list_recent_quotes',
          description: 'List recent quotes from the database',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Maximum number of results',
                default: 10,
              },
            },
          },
        },
      ],
    }))

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      try {
        switch (name) {
          case 'add_quote':
            const addArgs = args as unknown as AddQuoteArgs
            return await this.addQuote(addArgs.quote, addArgs.author)
          case 'search_quotes':
            const searchArgs = args as unknown as SearchQuotesArgs
            return await this.searchQuotes(
              searchArgs.query,
              searchArgs.limit || 10
            )
          case 'list_recent_quotes':
            const listArgs = args as ListRecentQuotesArgs
            return await this.listRecentQuotes(listArgs.limit || 10)
          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        }
      }
    })
  }

  private async addQuote(quote: string, author: string) {
    const uuid = randomUUID()
    const date = new Date().toISOString().split('T')[0]

    await this.db.execute({
      sql: `INSERT INTO zitat (uuid, date, quote, author) VALUES (?, ?, ?, ?)`,
      args: [uuid, date, quote, author],
    })

    const newRecord: QuoteRecord = { uuid, date, quote, author }
    this.quotes.push(newRecord)
    if (this.fuse) {
      this.fuse.add(newRecord)
    }

    return {
      content: [
        {
          type: 'text',
          text: `✅ 명언이 성공적으로 추가되었습니다!\n\nUUID: ${uuid}\n날짜: ${date}\n명언: "${quote}"\n작가: ${author}`,
        },
      ],
    }
  }

  private async searchQuotes(query: string, limit: number) {
    if (!this.fuse) {
      await this.initializeFuseIndex()
    }

    const results = this.fuse!.search(query, { limit })

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `"${query}"에 대한 검색 결과가 없습니다.`,
          },
        ],
      }
    }

    const resultText = results
      .map(
        (r: FuseResult<QuoteRecord>, i: number) =>
          `${i + 1}. "${r.item.quote}" - ${r.item.author} (${r.item.date})`
      )
      .join('\n\n')

    return {
      content: [
        {
          type: 'text',
          text: `🔍 "${query}" 검색 결과 (${results.length}개):\n\n${resultText}`,
        },
      ],
    }
  }

  private async listRecentQuotes(limit: number) {
    const result = await this.db.execute({
      sql: `SELECT uuid, date, quote, author 
            FROM zitat 
            ORDER BY date DESC, uuid DESC
            LIMIT ?`,
      args: [limit],
    })

    const results = result.rows

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: '데이터베이스에 명언이 없습니다.',
          },
        ],
      }
    }

    const resultText = results
      .map((r, i) => `${i + 1}. "${r[2]}" - ${r[3]} (${r[1]})`)
      .join('\n\n')

    return {
      content: [
        {
          type: 'text',
          text: `📋 최근 명언 ${results.length}개:\n\n${resultText}`,
        },
      ],
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    console.error('Zitat Quote MCP server running on stdio')
  }
}

const server = new QuoteServer()
server.run().catch(console.error)
