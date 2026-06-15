provider "aws" {
  region = "eu-west-2"
}

terraform {
  required_version = ">= 1.6.3, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.13.0, < 7.0.0"
    }
  }

  backend "s3" {
    bucket = "cddo-supporting-infrastructure-tfstate"
    key    = "cddo-zones-prod.tfstate"
    region = "eu-west-2"
  }
}
