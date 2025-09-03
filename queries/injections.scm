; Inject markdown grammar into the body
; This enables markdown syntax highlighting in email bodies
((body) @injection.content
  (#set! injection.language "markdown"))