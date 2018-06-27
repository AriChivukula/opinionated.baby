variable "NAME" {}

variable "DOMAIN" {}

provider "aws" {}

resource "aws_acm_certificate" "ob_certificate" {
  domain_name               = "${var.DOMAIN}"
  subject_alternative_names = ["*.${var.DOMAIN}"]
  validation_method         = "DNS"

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_s3_bucket" "ob_bucket" {
  bucket        = "${var.NAME}"
  force_destroy = true

  tags {
    Name = "${var.NAME}"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_route53_zone" "ob_zone" {
  name = "${var.DOMAIN}."

  tags {
    Name = "${var.NAME}"
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
  name = "${var.NAME}"

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

resource "aws_cloudfront_distribution" "ob_distribution" {
  enabled = true

  default_cache_behavior {
    allowed_methods = ["POST", "HEAD", "PATCH", "DELETE", "PUT", "GET", "OPTIONS"]
    cached_methods  = ["HEAD", "GET", "OPTIONS"]
    compress        = false
    default_ttl     = 0

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = "false"
    }

    target_origin_id       = "${var.DOMAIN}"
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name = "${aws_s3_bucket.ob_bucket.website_endpoint}"
    origin_id   = "${var.DOMAIN}"
    origin_path = "/master"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags {
    Name = "${var.NAME}"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.ob_certificate.arn}"
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "ob_record_static" {
  name    = "${var.DOMAIN}."
  type    = "A"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.ob_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.ob_distribution.hosted_zone_id}"
  }
}
