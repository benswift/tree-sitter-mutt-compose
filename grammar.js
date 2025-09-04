module.exports = grammar({
  name: 'mutt_compose',

  extras: $ => [],

  rules: {
    source_file: $ => optional($._content),

    _content: $ => choice(
      // Headers only, possibly with trailing newline
      seq($.header, repeat(seq('\n', $.header)), optional('\n')),
      // Headers with body separated by blank line
      seq($.header, repeat(seq('\n', $.header)), '\n', '\n', $.body),
      // Just body (starting with blank line)
      seq('\n', $.body),
      // Just a blank line
      '\n'
    ),

    header: $ => seq(
      field('key', $.header_key),
      ':',
      field('value', optional($.header_value))
    ),

    header_key: $ => /[A-Za-z][-A-Za-z0-9]*/,
    
    header_value: $ => /[^\n]+/,

    body: $ => /[\s\S]+/
  }
});