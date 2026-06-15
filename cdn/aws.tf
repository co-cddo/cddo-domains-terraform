provider "aws" {
  region = "eu-west-2"

  default_tags {
    tags = var.default_tags
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "us_east_1"

  default_tags {
    tags = var.default_tags
  }
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
    key    = "cddo-cdn-prod.tfstate"
    region = "eu-west-2"
  }
}
