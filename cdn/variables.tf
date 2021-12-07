locals {
  cddo_co_s3_origin_id = "cddo_cabinetoffice_gov_uk"
  cddo_bucket_name     = "cddo.cabinetoffice.gov.uk"
  primary_domain       = "cddo.cabinetoffice.gov.uk"
}

variable "default_tags" {
  default = {
    "Service" : "CDDO Supporting Infrastructure - CDN",
    "Reference" : "https://github.com/co-cddo/supporting-infrastructure",
    "Environment" : "Production"
  }
  description = "Default resource tags"
  type        = map(string)
}
