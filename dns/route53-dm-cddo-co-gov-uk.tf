resource "aws_route53_record" "data-delegated-zone" {
  zone_id         = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  allow_overwrite = true
  name            = "data"
  ttl             = local.standard_ttl
  type            = "NS"

  records = [
    "TBD"
  ]
}

resource "aws_route53_record" "dm-delegated-zone" {
  zone_id         = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  allow_overwrite = true
  name            = "dm"
  ttl             = local.standard_ttl
  type            = "NS"

  records = [
    "TBD"
  ]
}

resource "aws_route53_record" "dm-full-delegated-zone" {
  zone_id         = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  allow_overwrite = true
  name            = "datamarketplace"
  ttl             = local.standard_ttl
  type            = "NS"

  records = [
    "TBD"
  ]
}
