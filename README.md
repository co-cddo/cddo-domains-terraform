# cddo-domains-terraform

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform Version v1.0.11](https://img.shields.io/badge/Terraform-v1.0.11-blueviolet?style=for-the-badge&logo=terraform)
![Last commit image](https://img.shields.io/github/last-commit/co-cddo/domain-iac?style=for-the-badge&logo=github)

Infrastructure as code (Terraform) for the [cddo.cabinetoffice.gov.uk](https://cddo.cabinetoffice.gov.uk) domain running on AWS.

## CloudFront CDN

[cdn](cdn/) is for managing the web presence for CDDO, currently a redirect to gov.uk. CloudFront is used and S3 is the backend origin, [Functions](https://aws.amazon.com/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/) are used to handle traffic dynamically and in a scalable way.

The [router JavaScript function](cdn/functions/router/router.js) has several endpoints, for example:

|Path|Destination/Result|
|---|---|
|/.well-known/security.txt<br/>/security.txt|https://www.gov.uk/.well-known/security.txt|
|/.well-known/status|Should return 200 and not a redirect|
|/.well-known/hosting-provider|Should return 200 a link to CloudFront|
|/ddat-framework|https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework|
|/* (where not matched)|https://www.gov.uk/government/organisations/central-digital-and-data-office/about|

The router function has a test suite that can be ran by doing:
``` bash
cd cdn/functions/router/
npm install
npm test
```

## Route53 DNS

[dns](dns/) is the management of the Route53 zone and records.

Utilises the [aws-route53-parked-govuk-domain](https://github.com/co-cddo/aws-route53-parked-govuk-domain) Terraform module for _parking_ the email records.
