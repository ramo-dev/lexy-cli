
import { spawnSync } from "child_process";

export function checkStreamspeakInstalled(): boolean {
  try {
    const result = spawnSync("streamspeak", ["--list-voices"], { encoding: "utf-8" });
    // Check if it output some known voices as proof it's working
    return result.status === 0 && /kristin|amy|ljspeech|lessac|ryan/.test(result.stdout);
  } catch {
    return false;
  }
}

