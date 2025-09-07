---
id: task-1
title: grammar improvements
status: Done
assignee: []
created_date: "2025-09-05 00:03"
labels: []
dependencies: []
---

## Description

The grammar is currently working pretty well, but there are a couple of things
which could be better. In each case, come up with a fix and add a new test to
check it.

## Implementation Notes

All requested improvements have been successfully implemented:

1. **Empty header values**: Fixed by changing the header_value regex from `/[^\n]+/` to `/[^\n]*/` to allow empty values. Headers like `Cc:` and `Bcc:` with no values are now properly parsed with the header key highlighted.

2. **RFC 2822 Header folding**: Added support for multi-line headers as per RFC 2822. Header values can now span multiple lines when continuation lines start with whitespace (space or tab). The regex `/[^\n]*(\n[ \t]+[^\n]*)*/` properly handles folded headers.

3. **Reply highlighting approach**: After considering RFC 3676's complex quote handling rules, decided to keep the body as a simple text blob. Quote highlighting (for lines starting with `>`) should be handled by the editor's syntax highlighting queries rather than in the parser itself. This keeps the grammar simple and places visual distinction logic where it belongs - in the editor extension.

### Empty header values

It's not uncommon to have this:

```
From: Me <me@example.com>
To: Oldmate <oldmate@example.com>
Cc:
Bcc:
Subject: Re: Setup today
Message-ID: <v5jmfosr43s6owoqzmuxnw2pzslmrv6cbrwhfefebjnaxydhem@ttdx7xnfxx44>
Reply-To:
In-Reply-To: <SY4P282MB3648E46BCD529685E910FC92A100A@SY4P282MB3648.AUSP282.PROD.OUTLOOK.COM>

On Fri, 05 Sep 2025 at 08:10 AM +1000, Oldmate wrote:
>Yeah sorry, forgot to confirm with the previous email. I'll be aiming to
>be in at around 11.
>
>Cheers
```

The Cc: and Bcc: headers don't have their keys highlighted (maybe because their
values are blank). Can we fix this?

### Reply highlighting

In this (editing in progress) reply email:

```
From: Me <me@example.com>
To: Oldmate <oldmate@example.com>
Cc:
Bcc:
Subject: Re: Setup today
Message-ID: <v5jmfosr43s6owoqzmuxnw2pzslmrv6cbrwhfefebjnaxydhem@ttdx7xnfxx44>
Reply-To:
In-Reply-To: <SY4P282MB3648E46BCD529685E910FC92A100A@SY4P282MB3648.AUSP282.PROD.OUTLOOK.COM>

On Fri, 05 Sep 2025 at 08:10 AM +1000, Oldmate wrote:
>Yeah sorry, forgot to confirm with the previous email. I'll be aiming to
>be in at around 11.
>
>Cheers
```

Those last few lines (with the `>` prefix) should be visually distinct from the
rest of the text, but they're not. I think the grammar still considers them part
of the body, and so they get treated as markdown?

Anyway I'm not sure if there's a robust way to parse them as "replies" and
visually indicate as such, but that's what I want.
