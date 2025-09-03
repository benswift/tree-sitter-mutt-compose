module.exports = grammar({
  name: 'mutt_compose',

  rules: {
    source_file: $ => repeat(
      choice(
        $.header,
        $.quoted_line,
        $.quote_attribution,  
        $.markdown_heading,
        $.markdown_list_item,
        $.markdown_code_fence,
        $.text_line,
        $.blank_line
      )
    ),

    // Headers must have the exact format: Name: value
    header: $ => /[A-Z][-A-Za-z0-9]*: [^\n]*\n/,

    // Quoted lines 
    quoted_line: $ => />+ ?[^\n]*\n/,

    // Quote attribution
    quote_attribution: $ => /On .+ wrote:\n/,

    // Markdown heading
    markdown_heading: $ => /#{1,6} +[^\n]+\n/,

    // Markdown list
    markdown_list_item: $ => /[-*+] +[^\n]+\n/,

    // Code fence
    markdown_code_fence: $ => /```[^\n]*\n/,

    // Blank line
    blank_line: $ => /\n/,

    // Any other text (must not start with special chars)
    text_line: $ => /[^#>\-*+\n][^\n]*\n/
  }
});