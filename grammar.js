module.exports = grammar({
  name: 'mutt_compose',

  rules: {
    source_file: $ => seq(
      $.headers,
      optional($.body)
    ),

    // Headers section - everything until first blank line
    headers: $ => repeat1($.header),

    // Individual header
    header: $ => seq(
      field('key', /[A-Za-z][-A-Za-z0-9]*/),
      ':',
      optional(field('value', /[^\n]*/)),
      '\n'
    ),

    // Body is everything after the blank line separating headers
    body: $ => seq(
      '\n',  // blank line separator
      /[\s\S]*/  // everything else
    )
  }
});