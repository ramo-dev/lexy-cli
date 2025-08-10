
import cliSpinners from 'cli-spinners';
import chalk from 'chalk';

export class Spinner {
  private interval: NodeJS.Timeout | null = null;
  private text = '';
  private spinner = cliSpinners.dots;

  start(text: string) {
    if (this.interval) {
      this.stop();
    }
    this.text = text;
    let i = 0;
    process.stdout.write('\x1B[?25l'); // Hide cursor
    this.interval = setInterval(() => {
      const frame = this.spinner.frames[i];
      i = (i + 1) % this.spinner.frames.length;
      process.stdout.write(chalk.yellow(`\r${frame} ${this.text}`));
    }, this.spinner.interval);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      process.stdout.write('\r\x1b[K'); // Clear the line
      process.stdout.write('\x1B[?25h'); // Show cursor
    }
  }

  succeed(text: string) {
    this.stop();
    console.log(chalk.green(`✔ ${text}`));
  }

  fail(text: string) {
    this.stop();
    console.log(chalk.red(`✖ ${text}`));
  }
}

export const spinner = new Spinner();
