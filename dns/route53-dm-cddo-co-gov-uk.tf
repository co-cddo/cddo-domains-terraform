resource "aws_route53_record" "dm-delegated-zone" {
  zone_id         = aws_route53_zone.cddo-cabinetoffice-gov-uk.zone_id
  allow_overwrite = true
  name            = "dm"
  ttl             = 3600
  type            = "NS"

  records = [
    "ns-915.awsdns-50.net.",
    "ns-81.awsdns-10.com.",
    "ns-1190.awsdns-20.org.",
    "ns-1631.awsdns-11.co.uk.",
  ]
}
