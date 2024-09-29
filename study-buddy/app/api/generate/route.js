import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
1. Let the front bear a clear and concise question related to the prompt
2. Let the back bear a clear and accurate answer to the question in the front
3. Use a variety of question types such as definitions, examples, comparisons, identification, etc.
4. Use simple and concise grammar to cater to a wide range of readers.
5. Avoid overly complicated and difficult phrasing
6, If given a bunch of text, extract the most significant and relevant information to create the flashcards

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`
export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    // We'll implement the OpenAI API call here
    const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: data },
        ],
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
      })
    
      // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

        // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }