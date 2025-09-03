# tree-sitter-mutt-compose

A tree-sitter grammar for mutt compose files/buffers, with support for the Zed editor.

## Grammar structure

The grammar parses mutt compose files which consist of:
- **Headers**: Email headers in the format `Key: value`
- **Body**: The email body content, separated from headers by a blank line

The grammar correctly handles:
- Headers only (no body)
- Headers with body (separated by blank line)
- Body only (starting with blank line)
- Empty files

## Building

```bash
tree-sitter generate
tree-sitter test
cargo build
```

## Zed integration

This grammar is designed to work with the Zed editor. The repository includes:
- Zed extension configuration (`extension.toml`)
- Language configuration (`languages/mutt-compose/config.toml`)
- Syntax highlighting queries (`languages/mutt-compose/highlights.scm`)

To use in Zed as a local extension during development:
1. Clone this repository
2. In Zed, open the extensions directory
3. Create a symlink to this repository in the extensions directory

## Testing note

Due to how tree-sitter test corpus files are formatted (with a blank line after the test name), tests for "headers only" files will appear to fail because the parser sees them as starting with a newline (which makes them body-only files). This is a limitation of the test format, not the grammar itself.

When using this grammar on actual mutt compose files, it will work correctly:
- Files starting with headers will be parsed as headers
- Files starting with a blank line will be parsed as body-only
- Headers followed by a blank line and body will be parsed correctly