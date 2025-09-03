# tree-sitter-mutt-compose

A tree-sitter grammar for mutt compose files/buffers.

## Features

The grammar parses mutt compose files which consist of:
- **Headers**: Email headers in the format `Key: value`
- **Body**: The email body content, separated from headers by a blank line

### Query Files

The grammar includes:
- `queries/highlights.scm` - Syntax highlighting queries
- `queries/injections.scm` - Optional language injection (commented out by default) for markdown in body

The grammar correctly handles:
- Headers only (no body)
- Headers with body (separated by blank line)
- Body only (starting with blank line)
- Empty files

## Installation

### Cargo

```bash
cargo add tree-sitter-mutt-compose
```

### Source

```bash
git clone https://github.com/benswift/tree-sitter-mutt-compose
cd tree-sitter-mutt-compose
tree-sitter generate
```

## Building

```bash
tree-sitter generate  # Generate parser from grammar.js
tree-sitter test      # Run tests
cargo build           # Build Rust bindings
```

## Usage

This grammar can be used with any editor that supports tree-sitter:
- Neovim (via nvim-treesitter)
- Helix
- Zed (via extension)
- Emacs (via tree-sitter modes)

### Creating a Zed Extension

To use this grammar in Zed, create a separate extension repository with the following structure:

```
zed-mutt-compose/
├── extension.toml
├── languages/
│   └── mutt-compose/
│       ├── config.toml
│       └── highlights.scm
└── README.md
```

**extension.toml:**
```toml
id = "mutt-compose"
name = "Mutt Compose"
description = "Language support for mutt compose files"
version = "0.1.0"
schema_version = 1
authors = ["Your Name <your@email.com>"]
repository = "https://github.com/yourusername/zed-mutt-compose"

[grammars.mutt_compose]
repository = "https://github.com/benswift/tree-sitter-mutt-compose"
commit = "main"
```

**languages/mutt-compose/config.toml:**
```toml
name = "Mutt Compose"
grammar = "mutt_compose"
path_suffixes = ["mutt", "mutt-compose"]
line_comments = ["# "]
```

**languages/mutt-compose/highlights.scm:**
```scheme
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
```

## Examples

See the `examples/` directory for sample mutt compose files that demonstrate the grammar's capabilities.

## Testing

The grammar includes a comprehensive test suite in `test/corpus/`. Run tests with:

```bash
tree-sitter test
```

### Testing note

Due to how tree-sitter test corpus files are formatted (with a blank line after the test name), tests for "headers only" files will appear to start with a newline. This is a limitation of the test format, not the grammar itself. The grammar works correctly on actual files.

## License

MIT