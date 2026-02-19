## Fix the broken auto-merge workflow

The creator said it best:
> "The auto-merge is still broken — no pagination, no proper mergeability checks. Every merge in these two weeks was manual."

This PR fixes the actual problems with the auto-merge script so it can do its job without manual intervention.

### What was broken:

- Only fetched the first 100 PRs and first 100 reactions (no pagination)
- Never checked if PRs had merge conflicts
- Never checked if CI was passing
- Never checked for rhyming words in titles
- Only counted upvotes, completely ignored downvotes
- Used different ranking logic than what the website displays

### What's fixed:

- Full pagination for PRs and reactions - handles any number
- Proper mergeability checks: conflicts, CI status, draft status, rhyming titles
- Correct vote calculation: net votes = (upvotes - downvotes), same as the website
- Same ranking algorithm the frontend uses
- If the top PR somehow can't merge, falls back to the next one
- Better logging so you can see why each PR is or isn't eligible

### Technical changes:

Added `/api/top-pr` endpoint that exposes the ranking logic. The workflow now properly paginates through all data and validates PRs the same way the UI does. All the checks that were missing are now there.

The workflow can be tested manually via Actions without waiting for the weekly schedule.

This should end the manual merges and let the automation actually work.
