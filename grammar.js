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
    from_header: ($) =>
      seq(field("key", alias("From", $.header_key)), ":", field("value", $.header_value)),
    to_header: ($) =>
      seq(field("key", alias("To", $.header_key)), ":", field("value", $.header_value)),
    cc_header: ($) =>
      seq(field("key", alias("Cc", $.header_key)), ":", field("value", $.header_value)),
    bcc_header: ($) =>
      seq(field("key", alias("Bcc", $.header_key)), ":", field("value", $.header_value)),
    sender_header: ($) =>
      seq(field("key", alias("Sender", $.header_key)), ":", field("value", $.header_value)),
    reply_to_header: ($) =>
      seq(field("key", alias("Reply-To", $.header_key)), ":", field("value", $.header_value)),
    return_path_header: ($) =>
      seq(field("key", alias("Return-Path", $.header_key)), ":", field("value", $.header_value)),
    mail_followup_to_header: ($) =>
      seq(field("key", alias("Mail-Followup-To", $.header_key)), ":", field("value", $.header_value)),
    x_original_to_header: ($) =>
      seq(field("key", alias("X-Original-To", $.header_key)), ":", field("value", $.header_value)),

    // Identification headers
    subject_header: ($) =>
      seq(field("key", alias("Subject", $.header_key)), ":", field("value", $.header_value)),
    message_id_header: ($) =>
      seq(field("key", alias("Message-ID", $.header_key)), ":", field("value", $.header_value)),
    in_reply_to_header: ($) =>
      seq(field("key", alias("In-Reply-To", $.header_key)), ":", field("value", $.header_value)),
    references_header: ($) =>
      seq(field("key", alias("References", $.header_key)), ":", field("value", $.header_value)),

    // Date/time headers
    date_header: ($) =>
      seq(field("key", alias("Date", $.header_key)), ":", field("value", $.header_value)),
    expires_header: ($) =>
      seq(field("key", alias("Expires", $.header_key)), ":", field("value", $.header_value)),

    // MIME headers
    content_type_header: ($) =>
      seq(field("key", alias("Content-Type", $.header_key)), ":", field("value", $.header_value)),
    content_transfer_encoding_header: ($) =>
      seq(field("key", alias("Content-Transfer-Encoding", $.header_key)), ":", field("value", $.header_value)),
    content_disposition_header: ($) =>
      seq(field("key", alias("Content-Disposition", $.header_key)), ":", field("value", $.header_value)),
    content_description_header: ($) =>
      seq(field("key", alias("Content-Description", $.header_key)), ":", field("value", $.header_value)),
    content_language_header: ($) =>
      seq(field("key", alias("Content-Language", $.header_key)), ":", field("value", $.header_value)),
    content_length_header: ($) =>
      seq(field("key", alias("Content-Length", $.header_key)), ":", field("value", $.header_value)),
    mime_version_header: ($) =>
      seq(field("key", alias("MIME-Version", $.header_key)), ":", field("value", $.header_value)),

    // Mailing list headers
    list_post_header: ($) =>
      seq(field("key", alias("List-Post", $.header_key)), ":", field("value", $.header_value)),
    list_subscribe_header: ($) =>
      seq(field("key", alias("List-Subscribe", $.header_key)), ":", field("value", $.header_value)),
    list_unsubscribe_header: ($) =>
      seq(field("key", alias("List-Unsubscribe", $.header_key)), ":", field("value", $.header_value)),

    // Status headers
    status_header: ($) =>
      seq(field("key", alias("Status", $.header_key)), ":", field("value", $.header_value)),
    x_status_header: ($) =>
      seq(field("key", alias("X-Status", $.header_key)), ":", field("value", $.header_value)),

    // Other recognised headers
    organization_header: ($) =>
      seq(field("key", alias("Organization", $.header_key)), ":", field("value", $.header_value)),
    newsgroups_header: ($) =>
      seq(field("key", alias("Newsgroups", $.header_key)), ":", field("value", $.header_value)),
    followup_to_header: ($) =>
      seq(field("key", alias("Followup-To", $.header_key)), ":", field("value", $.header_value)),
    received_header: ($) =>
      seq(field("key", alias("Received", $.header_key)), ":", field("value", $.header_value)),
    x_label_header: ($) =>
      seq(field("key", alias("X-Label", $.header_key)), ":", field("value", $.header_value)),
    x_comment_to_header: ($) =>
      seq(field("key", alias("X-Comment-To", $.header_key)), ":", field("value", $.header_value)),
    xref_header: ($) =>
      seq(field("key", alias("Xref", $.header_key)), ":", field("value", $.header_value)),
    supersedes_header: ($) =>
      seq(field("key", alias("Supersedes", $.header_key)), ":", field("value", $.header_value)),

    // Neomutt pseudo-headers
    fcc_header: ($) =>
      seq(field("key", alias("Fcc", $.header_key)), ":", field("value", $.header_value)),
    attach_header: ($) =>
      seq(field("key", alias("Attach", $.header_key)), ":", field("value", $.header_value)),

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
