# Project Subagents (PM Workflow)

These subagents are tuned for the "Jira/Confluence vs Repo SSOT" workflow in `seacrets.online-storybook`.

Usage (Cursor chat):

- `/repo-ssot-auditor Audit repo state and token pipeline`
- `/jira-triage-pm Compare open SIF issues vs repo SSOT and draft comments`
- `/jira-operator APPLY: comment + transition these issues: ...`
- `/confluence-sync-pm Draft updates for pages 20.4.2 and 50.2`
- `/pm-status Create a weekly status update for the last 7 days`

Notes:

- Repo is treated as the source of truth by default.
- For Epic 5/6 component stories, operational DoD is "component + Storybook stories"; tests are tracked separately.

