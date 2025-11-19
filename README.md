<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1yl9z2bxrrFsj7P87dVYcvwb2rwU7vdKk

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Start the API/AI server with your Gemini key in the environment:
   - macOS/Linux: `GEMINI_API_KEY=your-key npm run start`
   - Windows (PowerShell): `$env:GEMINI_API_KEY='your-key'; npm run start`
3. In a second terminal, run the Vite dev server:
   `npm run dev`

The Vite server proxies all `/api/*` requests to the Express instance so the chat UI can reach both the Boromir and Gemini endpoints during development.
