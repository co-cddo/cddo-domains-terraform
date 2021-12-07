provider "aws" {
  region = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket = "cddo-supporting-infrastructure-tfstate"
    key    = "cddo-zones-prod.tfstate"
    region = "eu-west-2"
  }
}
