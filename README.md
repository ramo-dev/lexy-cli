# Lexy

Lexy is a conversational AI CLI tool that uses Google's AI models to provide intelligent responses to your queries. It also features text-to-speech (TTS) capabilities for voice-based interaction.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22.18.0 or later)
- [pnpm](https://pnpm.io/) (v10.13.1 or later)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ramo-dev/lexy.git
    cd lexy
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Google API key:

    ```
    GOOGLE_API_KEY=your_google_api_key
    ```

    You can obtain a Google API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Set up voice models (optional):**

    For text-to-speech (TTS) functionality, Lexy uses [Piper](https://github.com/rhasspy/piper). You can clone the voice models from the following repository:

    ```bash
    git clone https://github.com/ramo-dev/streamspeak
    ```

    Follow the instructions in the `streamspeak` repository to set up the voice models.

## Running the Application

To start the Lexy CLI, run the following command:

```bash
pnpm start
```

This will start the interactive CLI, and you can start conversing with Lexy.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions to Lexy! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.
