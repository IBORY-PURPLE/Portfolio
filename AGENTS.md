# Portfolio Agent Rules

These rules apply whenever Codex changes this portfolio's UI, content hierarchy, evidence model, or hiring narrative.

## Review Loop

- Run a two-role review loop for portfolio UI/content changes:
  - Toss recruiter reviewer: judges role clarity, verified impact, hiring scan speed, and overclaim risk.
  - UI/UX lead reviewer: judges hierarchy, density, mobile readability, CTA clarity, and interaction friction.
- Before implementation, collect P0/P1/P2 feedback with concrete acceptance criteria.
- After implementation, ask the same two roles to re-check the changed worktree.
- Fix actionable P0/P1 issues before calling the work complete. Record remaining P2 or blocked items in `docs/CHANGELOG.md`.

## Evidence And Claims

- Do not promote unverified or `needs_user_confirmation` projects into homepage hero, selected works, or Core Case Studies.
- Keep confirmed projects above strong-but-unconfirmed work. Put unconfirmed work in Additional Evidence or supporting sections.
- Preserve the evidence viewer, private evidence rules, local public asset paths, hash routing, project filters, and dark/light theme.
- Never expose private notes, phone numbers, tokens, API keys, raw diaries, or credentials in portfolio content or evidence previews.
- Prefer external/customer/business outcomes over internal implementation counts. If an outcome is only a public evidence count, label it as evidence, not impact.

## Portfolio UX Rules

- The hero must explain the target value and role within 5 seconds. Avoid broad identity lists.
- Use the official free Framer Baseframe template as the primary visual reference: oversized editorial type, large imagery, thin rules, generous whitespace, and very few boxed containers.
- Do not copy proprietary template source or brand assets. Recreate transferable layout and visual patterns in the existing React/CSS system.
- Every project must have a contextual `cover` image. Prefer real project photography when it is strong; otherwise use a consistent editorial art direction rather than generic stock photos or UI screenshots.
- Optimize generated covers to WebP before referencing them. Keep project-cover assets small enough for a hiring portfolio and record performance risks.
- Homepage selected works should use verified projects, large imagery, one impact line, role, and one result.
- Project index items should stay scannable: image first, then title, one impact line, role, and result. Put detailed Problem / Action / Result inside the case study.
- Project detail pages should start with `Brief / Role / Outcome / Evidence`, then follow `Overview -> Problem -> Role -> Result -> Evidence -> Review`.
- Keep the existing React/Vite structure unless explicitly asked otherwise. Do not add a router, CMS, Framer Motion, Tailwind, or a new dependency for UI-only changes.

## Change History

- Update `docs/CHANGELOG.md` for every meaningful version.
- Use AI-readable sections: Summary, Agent Feedback Incorporated, Added, Changed, Verification, Residual Risks.
- Record exact command results for `npm run check`, `npm run lint`, `npm run build`, and any visual QA. If a command is blocked by the environment, record the blocker instead of implying success.
