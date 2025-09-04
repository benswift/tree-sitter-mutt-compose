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
        field("value", optional($.header_value)),
      ),

    header_key: ($) => /[A-Za-z][-A-Za-z0-9]*/,

    header_value: ($) => /[^\n]+/,

    body: ($) => /[\s\S]+/,
  },
});
