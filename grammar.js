module.exports = grammar({
  name: 'mutt_compose',

  rules: {
    source_file: $ => seq(
      optional($.headers),
      optional(seq(
        $.separator,
        optional($.body)
      ))
    ),

    headers: $ => repeat1($.header),

    // Header with separate key and value fields
    header: $ => seq(
      field('key', /[A-Za-z][-A-Za-z0-9]*/),
      ':',
      field('value', optional(/[^\n]*/)),
      '\n'
    ),

    // Blank line separator  
    separator: $ => '\n',

    // Body is everything after separator
    body: $ => /[\s\S]+/
  }
});