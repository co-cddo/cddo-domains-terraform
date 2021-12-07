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
  backend "s3" {
    bucket = "cddo-supporting-infrastructure-tfstate"
    key    = "cddo-cdn-prod.tfstate"
    region = "eu-west-2"
  }
}
