import { spawn } from "child_process";
import { voices } from "../types/voices";

interface Config {
  text: string;
  voice?: voices;
  speed?: number;
  onDone?: () => void;
}

export function speak({
  text,
  voice = "ljspeech",
  speed = 0.9,
  onDone,
}: Config): Promise<void> {
  return new Promise((resolve, reject) => {
    const tts = spawn("streamspeak", ["-v", voice, "-s", String(speed)], {
      stdio: ["pipe", "ignore", "pipe"], 
    });

    tts.stdin.write(text);
    tts.stdin.end();

    let errorOutput = "";
    tts.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    tts.on("close", (code) => {
      if (onDone) onDone();
      if (code === 0) {
        resolve();
      } else {
        // console.error(`TTS error: ${errorOutput}`);
        reject(new Error(`TTS exited with code ${code}: ${errorOutput}`));
      }
    });

    tts.on("error", (err) => {
        reject(err);
    })
  });
}
