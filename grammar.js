module.exports = grammar({
  name: 'mutt_compose',

  extras: $ => [],

  rules: {
    source_file: $ => choice(
      seq(),  // Empty file
      $._content
    ),

    _content: $ => choice(
      // Headers only, possibly with trailing newline
      seq($._header_line, repeat(seq('\n', $._header_line)), optional('\n')),
      // Headers with body separated by blank line
      seq($._header_line, repeat(seq('\n', $._header_line)), '\n', '\n', $.body),
      // Just body (starting with blank line)
      seq('\n', $.body),
      // Just a blank line
      '\n'
    ),

    _header_line: $ => $.header,

    header: $ => seq(
      field('key', /[A-Za-z][-A-Za-z0-9]*/),
      ':',
      field('value', optional(/[^\n]*/))
    ),

    body: $ => /[\s\S]+/
  }
});