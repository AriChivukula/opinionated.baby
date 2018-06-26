locals {
  domain = "opinionated.baby"
  name   = "opinionatedbaby"
}

provider "aws" {}

resource "aws_acm_certificate" "ob_certificate" {
  domain_name               = "${local.domain}"
  subject_alternative_names = ["*.${local.domain}"]
  validation_method         = "DNS"

  tags {
    Name = "${local.name}"
  }
}

resource "aws_s3_bucket" "ob_bucket_www" {
  bucket        = "${local.domain}"
  force_destroy = true

  tags {
    Name = "${local.name}"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket" "ob_bucket_beta" {
  bucket        = "beta.${local.domain}"
  force_destroy = true

  tags {
    Name = "${local.name}"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket" "ob_bucket_builds" {
  bucket        = "builds.${local.domain}"
  force_destroy = true

  tags {
    Name = "${local.name}"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_cloudfront_distribution" "ob_distribution_www" {
  aliases = ["${local.domain}"]
  enabled = true

  default_cache_behavior {
    allowed_methods = ["HEAD", "GET"]
    cached_methods  = ["HEAD", "GET"]
    compress        = false
    default_ttl     = 0

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = "false"
    }

    target_origin_id       = "${local.domain}"
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name = "${aws_s3_bucket.ob_bucket_www.website_endpoint}"
    origin_id   = "${local.domain}"

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
    Name = "${local.name}"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.ob_certificate.arn}"
    ssl_support_method  = "sni-only"
  }
}

resource "aws_cloudfront_distribution" "ob_distribution_beta" {
  aliases = ["beta.${local.domain}"]
  enabled = true

  default_cache_behavior {
    allowed_methods = ["HEAD", "GET"]
    cached_methods  = ["HEAD", "GET"]
    compress        = false
    default_ttl     = 0

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = "false"
    }

    target_origin_id       = "beta.${local.domain}"
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name = "${aws_s3_bucket.ob_bucket_beta.website_endpoint}"
    origin_id   = "beta.${local.domain}"

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
    Name = "${local.name}"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.ob_certificate.arn}"
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_zone" "ob_zone" {
  name = "${local.domain}."

  tags {
    Name = "${local.name}"
  }
}

resource "aws_route53_record" "ob_record_www" {
  name    = "${local.domain}."
  type    = "A"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.ob_distribution_www.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.ob_distribution_www.hosted_zone_id}"
  }
}

resource "aws_route53_record" "ob_record_redirect" {
  name    = "www.${local.domain}."
  ttl     = 60
  type    = "CNAME"
  records = ["${local.domain}"]
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"
}

resource "aws_route53_record" "ob_record_beta" {
  name    = "beta.${local.domain}."
  type    = "A"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.ob_distribution_beta.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.ob_distribution_beta.hosted_zone_id}"
  }
}

resource "aws_route53_record" "ob_record_validation" {
  count   = "${length(aws_acm_certificate.ob_certificate.domain_validation_options)}"
  name    = "${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_name")}"
  records = ["${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_value")}"]
  ttl     = 60
  type    = "${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_type")}"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"
}

resource "aws_acm_certificate_validation" "ob_validation" {
  certificate_arn         = "${aws_acm_certificate.ob_certificate.arn}"
  validation_record_fqdns = ["${aws_route53_record.ob_record_validation.*.fqdn}"]
}
