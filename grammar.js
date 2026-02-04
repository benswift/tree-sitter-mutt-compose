module.exports = grammar({
  name: "mutt_compose",

  extras: ($) => [],

  rules: {
    source_file: ($) => optional($._content),

    _content: ($) =>
      seq($._header, repeat(seq("\n", $._header)), "\n", "\n", $.body),

    _header: ($) =>
      choice(
        // Address headers
        $.from_header,
        $.to_header,
        $.cc_header,
        $.bcc_header,
        $.sender_header,
        $.reply_to_header,
        $.return_path_header,
        $.mail_followup_to_header,
        $.x_original_to_header,

        // Identification headers
        $.subject_header,
        $.message_id_header,
        $.in_reply_to_header,
        $.references_header,

        // Date/time headers
        $.date_header,
        $.expires_header,

        // MIME headers
        $.content_type_header,
        $.content_transfer_encoding_header,
        $.content_disposition_header,
        $.content_description_header,
        $.content_language_header,
        $.content_length_header,
        $.mime_version_header,

        // Mailing list headers
        $.list_post_header,
        $.list_subscribe_header,
        $.list_unsubscribe_header,

        // Status headers
        $.status_header,
        $.x_status_header,

        // Other recognised headers
        $.organization_header,
        $.newsgroups_header,
        $.followup_to_header,
        $.received_header,
        $.x_label_header,
        $.x_comment_to_header,
        $.xref_header,
        $.supersedes_header,

        // Neomutt pseudo-headers
        $.fcc_header,
        $.attach_header,

        // Fallback for unknown headers
        $.custom_header,
      ),

    // Address headers
    from_header: ($) => seq("From", ":", field("value", $.header_value)),
    to_header: ($) => seq("To", ":", field("value", $.header_value)),
    cc_header: ($) => seq("Cc", ":", field("value", $.header_value)),
    bcc_header: ($) => seq("Bcc", ":", field("value", $.header_value)),
    sender_header: ($) => seq("Sender", ":", field("value", $.header_value)),
    reply_to_header: ($) =>
      seq("Reply-To", ":", field("value", $.header_value)),
    return_path_header: ($) =>
      seq("Return-Path", ":", field("value", $.header_value)),
    mail_followup_to_header: ($) =>
      seq("Mail-Followup-To", ":", field("value", $.header_value)),
    x_original_to_header: ($) =>
      seq("X-Original-To", ":", field("value", $.header_value)),

    // Identification headers
    subject_header: ($) => seq("Subject", ":", field("value", $.header_value)),
    message_id_header: ($) =>
      seq("Message-ID", ":", field("value", $.header_value)),
    in_reply_to_header: ($) =>
      seq("In-Reply-To", ":", field("value", $.header_value)),
    references_header: ($) =>
      seq("References", ":", field("value", $.header_value)),

    // Date/time headers
    date_header: ($) => seq("Date", ":", field("value", $.header_value)),
    expires_header: ($) => seq("Expires", ":", field("value", $.header_value)),

    // MIME headers
    content_type_header: ($) =>
      seq("Content-Type", ":", field("value", $.header_value)),
    content_transfer_encoding_header: ($) =>
      seq("Content-Transfer-Encoding", ":", field("value", $.header_value)),
    content_disposition_header: ($) =>
      seq("Content-Disposition", ":", field("value", $.header_value)),
    content_description_header: ($) =>
      seq("Content-Description", ":", field("value", $.header_value)),
    content_language_header: ($) =>
      seq("Content-Language", ":", field("value", $.header_value)),
    content_length_header: ($) =>
      seq("Content-Length", ":", field("value", $.header_value)),
    mime_version_header: ($) =>
      seq("MIME-Version", ":", field("value", $.header_value)),

    // Mailing list headers
    list_post_header: ($) =>
      seq("List-Post", ":", field("value", $.header_value)),
    list_subscribe_header: ($) =>
      seq("List-Subscribe", ":", field("value", $.header_value)),
    list_unsubscribe_header: ($) =>
      seq("List-Unsubscribe", ":", field("value", $.header_value)),

    // Status headers
    status_header: ($) => seq("Status", ":", field("value", $.header_value)),
    x_status_header: ($) =>
      seq("X-Status", ":", field("value", $.header_value)),

    // Other recognised headers
    organization_header: ($) =>
      seq("Organization", ":", field("value", $.header_value)),
    newsgroups_header: ($) =>
      seq("Newsgroups", ":", field("value", $.header_value)),
    followup_to_header: ($) =>
      seq("Followup-To", ":", field("value", $.header_value)),
    received_header: ($) =>
      seq("Received", ":", field("value", $.header_value)),
    x_label_header: ($) => seq("X-Label", ":", field("value", $.header_value)),
    x_comment_to_header: ($) =>
      seq("X-Comment-To", ":", field("value", $.header_value)),
    xref_header: ($) => seq("Xref", ":", field("value", $.header_value)),
    supersedes_header: ($) =>
      seq("Supersedes", ":", field("value", $.header_value)),

    // Neomutt pseudo-headers
    fcc_header: ($) => seq("Fcc", ":", field("value", $.header_value)),
    attach_header: ($) => seq("Attach", ":", field("value", $.header_value)),

    // Fallback for unknown/custom headers (X-* and others)
    custom_header: ($) =>
      seq(
        field("key", $.header_key),
        ":",
        field("value", $.header_value),
      ),

    // RFC 5322: field names are printable ASCII except colon
    header_key: ($) => /[A-Za-z][-A-Za-z0-9]*/,

    // RFC 5322: header values can span multiple lines if continuation lines start with whitespace
    header_value: ($) => /[^\n]*(\n[ \t]+[^\n]*)*/,

    body: ($) => /[\s\S]+/,
  },
});
