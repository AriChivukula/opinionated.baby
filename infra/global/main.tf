variable "name" {
  type = "string"
}

variable "domain" {
  type = "string"
}

provider "aws" {}

resource "aws_acm_certificate" "ob_certificate" {
  domain_name               = "${var.domain}"
  subject_alternative_names = ["*.${var.domain}"]
  validation_method         = "DNS"

  tags {
    Name = "${var.name}"
  }
}

resource "aws_s3_bucket" "ob_bucket" {
  bucket        = "${var.name}"
  force_destroy = true

  tags {
    Name = "${var.name}"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_api_gateway_rest_api" "ob_api" {
  name = "${var.name}"
}

resource "aws_route53_zone" "ob_zone" {
  name = "${var.domain}."

  tags {
    Name = "${var.name}"
  }
}

resource "aws_route53_record" "ob_record" {
  count   = "${length(aws_acm_certificate.ob_certificate.domain_validation_options)}"
  name    = "${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_name")}"
  records = ["${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_value")}"]
  ttl     = 60
  type    = "${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_type")}"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"
}

resource "aws_acm_certificate_validation" "ob_validation" {
  certificate_arn         = "${aws_acm_certificate.ob_certificate.arn}"
  validation_record_fqdns = ["${aws_route53_record.ob_record.*.fqdn}"]
}

resource "aws_iam_role" "ob_iam" {
  name = "${var.name}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
