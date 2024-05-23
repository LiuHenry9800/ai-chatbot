import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

import {OpenAI as OpenaiClient} from 'openai';
const client = new OpenaiClient({
  apiKey: process.env.OPENAI_API_KEY,
});

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  const thread = await client.beta.threads.create()
  console.log('thread.id', thread.id)

  return (
    <AI initialAIState={{ chatId: thread.id, messages: [] }}>
      <Chat id={thread.id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
