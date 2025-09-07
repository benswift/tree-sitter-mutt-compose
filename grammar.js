module.exports = grammar({
  name: "mutt_compose",

  extras: ($) => [],

  rules: {
    source_file: ($) => optional($._content),

    _content: ($) =>
      seq($.header, repeat(seq("\n", $.header)), "\n", "\n", $.body),

    header: ($) =>
      seq(
        field("key", $.header_key),
        ":",
        field("value", $.header_value),
      ),

    header_key: ($) => /[A-Za-z][-A-Za-z0-9]*/,

    // RFC 2822: Header values can span multiple lines if continuation lines start with whitespace
    header_value: ($) => /[^\n]*(\n[ \t]+[^\n]*)*/,

    body: ($) => /[\s\S]+/,
  },
});
