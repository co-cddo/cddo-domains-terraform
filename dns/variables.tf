variable "default_tags" {
  default = {
    "Service" : "CDDO Supporting Infrastructure - DNS",
    "Reference" : "https://github.com/co-cddo/supporting-infrastructure",
    "Environment" : "Production"
  }
  description = "Default resource tags"
  type        = map(string)
}
