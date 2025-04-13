# Vehicle GPT Backend

A NestJS backend service that integrates with Clerk for authentication, Airtable for data storage, and N8N for workflow automation.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Airtable account
- Clerk account
- N8N account or self-hosted instance

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vehicle-gpt-be
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=4000
CLERK_SECRET_KEY=your_clerk_secret_key
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

## Airtable Setup

1. Create the following tables in your Airtable base:
   - `Users`: Store user information
     - Fields: `email`, `userId`
   - `Criteria`: Store user criteria
     - Fields: `userId`, `criteria_key`, `name`, `weight`, `description`

2. Get your Airtable API key and Base ID from your account settings.

## N8N Workflow Setup

1. Create a new workflow in N8N
2. Add a Webhook node as the trigger:
   - Method: POST
   - Path: /vehicle-gpt (or your preferred path)
   - Response Mode: Last Node

3. The webhook will receive data in this format:
```json
{
  "risk_criterias": ["criteria1", "criteria2"],
  "message": "user message"
}
```

4. Add your processing nodes:
   - Add nodes to process the criteria and message
   - Configure response format as needed
   - Connect to your AI service if required

5. Deploy the workflow and copy the webhook URL

## Running the Application

1. Development mode:
```bash
npm run start:dev
```

2. Production mode:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/init-data`: Initialize user data and get criteria
  - Requires Clerk authentication token in header
  - Returns user criteria if exists, creates default criteria if new user

### Chat
- `POST /chat/send-message`: Send message to process
  - Requires Clerk authentication token in header
  - Body:
    ```json
    {
      "message": "your message"
    }
    ```

## Security

- All endpoints are protected with Clerk authentication
- Use environment variables for sensitive data
- CORS is enabled for frontend origin

## Error Handling

The application includes error handling for:
- Invalid/missing authentication
- Airtable API errors
- N8N webhook failures

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request