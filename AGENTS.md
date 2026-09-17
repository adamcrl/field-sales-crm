# Field Sales CRM

## Product

A mobile-first, multi-tenant CRM for B2B field sales reps. Reps define their
product and ideal customer profile, find promising nearby businesses, and log
prospect and visit activity.

## Working rules

- Start with Next.js, TypeScript, Tailwind, Supabase, and PostGIS.
- Use fictional seed data until a data provider is explicitly approved.
- Never commit secrets, API keys, or real customer/prospect data.
- Keep each tenant's data isolated by `organization_id` and Row Level Security.
- Use migrations for database changes.
- Treat AI output as editable, validated search filters; never execute AI-built SQL.
- Before completing work, run the available lint, typecheck, test, and build commands.
- Summarize changed files and any checks that could not run.
