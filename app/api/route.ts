import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

export const runtime = "edge"

export async function POST(req: Request){
    const {messages} = await req.json()


    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messages,
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}