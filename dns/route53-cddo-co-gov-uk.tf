locals {
  domain = "cddo.cabinetoffice.gov.uk"
}

resource "aws_route53_zone" "cddo-cabinetoffice-gov-uk" {
  name = local.domain

  tags = merge(
    { "Name" : local.domain },
    var.default_tags
  )
}

resource "aws_route53_record" "github-verification" {
  zone_id = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  name    = "_github-challenge-co-cddo.${local.domain}"
  type    = "TXT"
  ttl     = 60
  records = ["460027a232"]
}

data "aws_cloudfront_distribution" "cdn" {
  id = "E1ANKD1BIVPOW4"
}

resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  name    = local.domain
  type    = "A"

  alias {
    name                   = data.aws_cloudfront_distribution.cdn.domain_name
    zone_id                = data.aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-aaaa" {
  zone_id = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  name    = local.domain
  type    = "AAAA"

  alias {
    name                   = data.aws_cloudfront_distribution.cdn.domain_name
    zone_id                = data.aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

module "co-cddo-aws-r53-parked-domain" {
  source            = "github.com/co-cddo/aws-route53-parked-govuk-domain//terraform?ref=829478ba8ed41863d7e5f526475de3e09171da4d"
  zone_id           = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  depends_on        = [aws_route53_zone.cddo-cabinetoffice-gov-uk]
  email_records     = true  # default
  webserver_records = false # default
}
