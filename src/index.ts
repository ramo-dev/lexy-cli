import { response } from "./ai";
import chalk from "chalk";
import { rl } from "./utils/readline";
import boxen from "boxen";

let voiceEnabled = true;

function printBanner() {
  const banner = chalk.red(`
██╗     ███████╗██╗  ██╗██╗   ██╗
██║     ██╔════╝██║  ██║╚██╗ ██╔╝
██║     █████╗   █████║  ╚████╔╝ 
██║     ██╔══╝  ██╔══██║  ╚██╔╝  
███████╗███████╗██║  ██║   ██║   
╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   
  `);
  console.log(banner);
}

function printHelp() {
  const helpText = `
  ${chalk.bold("Available Commands:")}
  ${chalk.cyan("/voice on")}      - Enable text-to-speech
  ${chalk.cyan("/voice off")}     - Disable text-to-speech
  ${chalk.cyan("/help")}          - Show this help message
  ${chalk.cyan("/exit")}          - Quit the application
  `;
  console.log(boxen(helpText, { padding: 1, margin: {bottom: 1}, borderStyle: "round", borderColor: "gray", title: "Commands" }));
}

function printVoiceStatus() {
    const status = voiceEnabled ? chalk.green("ON") : chalk.red("OFF");
    console.log(chalk.gray(`🎤 Voice is currently ${status}\n`));
}

function printHeader() {
    console.clear();
    printBanner();
    printHelp();
    printVoiceStatus();
}

process.on("SIGINT", () => {
  console.log(chalk.red("\n👋 Bye bye."));
  process.exit();
});

async function main() {
  printHeader();

  while (true) {
    const input = await new Promise<string>((resolve) => {
      rl.question(chalk.magentaBright("> "), resolve);
    });

    const command = input.trim().toLowerCase();

    if (command === "exit" || command === "/exit") {
      console.log(chalk.red("👋 Later, nerd."));
      break;
    }

    try {
        switch (command) {
            case "/voice on":
                voiceEnabled = true;
                printHeader();
                break;
            case "/voice off":
                voiceEnabled = false;
                printHeader();
                break;
            case "/help":
                printHeader();
                break;
            default:
                await response(input, voiceEnabled);
                break;
        }
    } catch (error) {
        console.error(chalk.red("\nAn unexpected error occurred:"), error);
        // The loop will continue, allowing the user to try again.
    }
  }

  rl.close();
}

main();
