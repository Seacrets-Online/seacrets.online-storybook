---
name: jira-confluence-subagents
description: Use Jira and Confluence subagents (jira-operator, jira-triage-pm, confluence-sync-pm) via Task tool. Use when commenting on Jira issues, transitioning tickets, triaging SIF board, or syncing Confluence planning docs.
---

# Jira and Confluence Subagents

## When to Use

| Subagent | Use Case | Writes? |
|----------|----------|---------|
| **jira-operator** | Add comments, transition status, edit fields, create follow-ups | Yes |
| **jira-triage-pm** | Compare open Jira vs repo SSOT, draft recommended comments/transitions | No (read-only) |
| **confluence-sync-pm** | Draft or apply Confluence updates to align with Jira + repo | Yes (if approved) |

## Invocation

Use the **Task** tool (`mcp_task`) with `subagent_type`:

```
Task(subagent_type="jira-operator", prompt="Add comment to SIF-47: [body]")
Task(subagent_type="jira-triage-pm", prompt="Compare SIF board vs main branch")
Task(subagent_type="confluence-sync-pm", prompt="Draft update for page 20.4.2")
```

## Direct MCP (when subagent unavailable)

If the Atlassian MCP server is enabled, use `call_mcp_tool`:

1. **Get cloudId**: `getAccessibleAtlassianResources` → use `id` from seacrets entry
2. **Add comment**: `addCommentToJiraIssue` with `cloudId`, `issueIdOrKey`, `commentBody`

```json
{
  "cloudId": "955437f2-7fb9-4cb3-ac62-4db5fd86de5e",
  "issueIdOrKey": "SIF-47",
  "commentBody": "Comment text in Atlassian markup..."
}
```

## Project Defaults

- **cloudId**: `955437f2-7fb9-4cb3-ac62-4db5fd86de5e` (seacrets.atlassian.net)
- **projectKey**: `SIF`

## jira-operator Rules

- Only applies changes when user explicitly requests (e.g. "comenta SIF-47", "APPLY")
- Never hardcode transition IDs; use `getTransitionsForJiraIssue` and pick by name
- Before creating follow-ups, search JQL to avoid duplicates

## jira-triage-pm Rules

- Read-only: drafts analysis and comments, does not modify Jira
- Default JQL: `project = SIF AND statusCategory != Done ORDER BY created DESC`
- Output: table (Issue | Type | Status | Repo status | Evidence | Recommendation) + draft comments

## confluence-sync-pm Rules

- Only updates Confluence when user explicitly requests
- Otherwise drafts Markdown body + changelog for manual paste
- Preserve page title unless explicitly asked to change
