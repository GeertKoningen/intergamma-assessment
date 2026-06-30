<!-- BEGIN:nextjs-agent-rules -->

# Agent Notes

This project uses Next.js 16, TypeScript, Tailwind CSS, and the App Router.
Next.js 16 may differ from older training data, so check local docs or existing
project patterns before changing framework-specific code.

## Assessment Focus

The assignment is a Product Listing Page with a persistent wishlist side panel.

Keep these requirements visible when editing:
- Product data comes from local JSON files.
- Product listing should be server-rendered where possible.
- Wishlist state belongs in Client Components because it uses browser state and localStorage.
- The wishlist opens as an overlay side panel from the header favorites button.
- Accessibility matters: semantic HTML, keyboard navigation, useful labels, and no nested interactive elements.

## Verification

Use `npm.cmd` on Windows PowerShell to avoid npm.ps1 execution policy issues.

Before finishing, run:
- `npm.cmd test -- --runInBand`
- `npm.cmd run lint`
- `npm.cmd run build`

Do not run repo-wide formatting unless explicitly requested. If formatting is
needed, format only touched files to avoid noisy diffs.

<!-- END:nextjs-agent-rules -->
