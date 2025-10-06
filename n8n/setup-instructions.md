# N8N Kanban Export Setup

1. Import `workflow.json` in N8N.
2. Ensure Webhook URL matches: http://localhost:5678/webhook/kanban-export
3. Add steps:
   - HTTP Request to Backend `/api/tasks` to fetch tasks
   - (Optional) Transform JSON to desired shape
   - Spreadsheet File node to generate CSV
   - Email Send node to deliver CSV
4. Test the workflow.
