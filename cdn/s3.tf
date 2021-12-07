resource "aws_s3_bucket" "co_cddo_cdn_source_bucket" {
  bucket = local.cddo_bucket_name
  acl    = "private"

  tags = { "Name" : local.cddo_bucket_name }
}

resource "aws_cloudfront_origin_access_identity" "co_cddo_cdn_source_bucket" {
  comment = local.cddo_bucket_name
}

data "aws_iam_policy_document" "co_cddo_cdn_source_bucket_policy" {
  statement {
    actions = ["s3:GetObject", "s3:ListBucket"]
    resources = [
      "${aws_s3_bucket.co_cddo_cdn_source_bucket.arn}/*",
      aws_s3_bucket.co_cddo_cdn_source_bucket.arn
    ]

    principals {
      type = "AWS"
      identifiers = [
        aws_cloudfront_origin_access_identity.co_cddo_cdn_source_bucket.iam_arn
      ]
    }
  }
}

resource "aws_s3_bucket_policy" "co_cddo_cdn_source_bucket" {
  bucket = aws_s3_bucket.co_cddo_cdn_source_bucket.id
  policy = data.aws_iam_policy_document.co_cddo_cdn_source_bucket_policy.json
}
