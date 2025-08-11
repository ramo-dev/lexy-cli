import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { speak } from "./utils/speak";
import dotenv from "dotenv";
import removeMd from "remove-markdown";
import { lexaiPrompt } from "./config";
import { spinner } from "./utils/spinner";
import boxen from "boxen";
import chalk from "chalk";
import { voices } from "./types/voices";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

marked.setOptions({
  // @ts-ignore — because marked-terminal's type defs are prehistoric
  renderer: new TerminalRenderer({
    heading: chalk.cyan.bold,
    firstHeading: chalk.magenta.bold.underline,
    code: chalk.green,
  }),
})

dotenv.config();

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const voice = "ryan";
const speed = 0.9;
const response_type = "professional";

async function safeSpeak(text: string, voice: voices, speed: number) {
    spinner.start("Lexy is speaking...");
    try {
        await speak({ text, voice, speed });
        spinner.stop(); // Stop cleanly without a success message
    } catch (error) {
        spinner.fail(chalk.red("TTS Error. Is 'streamspeak' installed and in your PATH?"));
    }
}

export async function response(prompt: string, voiceEnabled: boolean) {
  spinner.start("Lexy is thinking...");
  let result;
  try {
    result = await streamText({
      model: google("gemini-1.5-flash-latest"),
      prompt,
      system: lexaiPrompt(voice, response_type, voiceEnabled),
    });
  } catch (error) {
      spinner.fail(chalk.red(`API Error: ${error instanceof Error ? error.message : "Unknown error"}`));
      return;
  }
  
  spinner.stop();

  let sentenceBuffer = "";
  let fullResponse = "";

  for await (const chunk of result.textStream) {
    fullResponse += chunk;
    if (voiceEnabled) {
        sentenceBuffer += chunk;
        if (sentenceBuffer.match(/[.!?]\s*$/)) {
            const clean = removeMd(sentenceBuffer.trim());
            if(clean) await safeSpeak(clean, voice, speed);
            sentenceBuffer = "";
        }
    }
  }

  if (voiceEnabled && sentenceBuffer.trim().length > 0) {
    const clean = removeMd(sentenceBuffer.trim());
    if(clean) await safeSpeak(clean, voice, speed);
  }

  const renderedResponse = marked(fullResponse);
  const terminalWidth = process.stdout.columns;
  const boxWidth = terminalWidth - 4;

//@ts-ignore
  const finalBox = boxen(renderedResponse, {
    width: boxWidth,
    padding: 1,
    margin: { top: 1, bottom: 1 },
    borderStyle: "round",
    borderColor: "cyan",
    title: "Lexy's Response",
    titleAlignment: "left",
  });

  console.log(finalBox);
}
