# tree-sitter-mutt-compose

A tree-sitter grammar for mutt compose files/buffers.

## Features

The grammar parses mutt compose files which consist of:
- **Headers**: Email headers in the format `Key: value`
- **Body**: The email body content, separated from headers by a blank line

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