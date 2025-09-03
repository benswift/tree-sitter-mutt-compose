; Email headers
(header
  key: (_) @keyword
  value: (_) @string)

; Common email header fields get special highlighting
(header
  key: (_) @keyword.special
  (#match? @keyword.special "^(From|To|Cc|Bcc|Subject|Reply-To|Date)$"))

; X- headers (custom headers)
(header
  key: (_) @property
  (#match? @property "^X-"))

; Body content
(body) @text

; Punctuation
":" @punctuation.delimiter