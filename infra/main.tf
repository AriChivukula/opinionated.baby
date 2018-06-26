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

resource "aws_s3_bucket" "ob_bucket" {
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

resource "aws_s3_bucket" "ob_bucket_builds" {
  bucket        = "builds.${local.domain}"
  force_destroy = true

  tags {
    Name = "${local.name}"
  }
}

data "aws_lambda_function" "ob_lambda" {
  function_name = "${local.name}"
}

resource "aws_api_gateway_rest_api" "ob_api" {
  name = "${local.name}"
}

resource "aws_api_gateway_resource" "ob_resource" {
  path_part   = "{proxy+}"
  parent_id   = "${aws_api_gateway_rest_api.ob_api.root_resource_id}"
  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
}

resource "aws_api_gateway_method" "ob_method" {
  rest_api_id   = "${aws_api_gateway_rest_api.ob_api.id}"
  resource_id   = "${aws_api_gateway_resource.ob_resource.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "ob_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  resource_id = "${aws_api_gateway_method.ob_method.resource_id}"
  http_method = "${aws_api_gateway_method.ob_method.http_method}"

  integration_http_method = "ANY"
  type                    = "AWS_PROXY"
  uri                     = "${replace(data.aws_lambda_function.ob_lambda.invoke_arn, ":$LATEST", "")}"
}

resource "aws_api_gateway_integration_response" "ob_response" {
  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  resource_id = "${aws_api_gateway_resource.ob_resource.id}"
  http_method = "${aws_api_gateway_method.ob_method.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_deployment" "ob_deployment" {
  depends_on = [
    "aws_api_gateway_integration.ob_integration",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  stage_name  = "PROD"
}

resource "aws_api_gateway_domain_name" "ob_domain" {
  domain_name = "api.${local.domain}"

  certificate_arn = "${aws_acm_certificate.ob_certificate.arn}"
}

resource "aws_api_gateway_base_path_mapping" "ob_map" {
  api_id      = "${aws_api_gateway_rest_api.ob_api.id}"
  stage_name  = "${aws_api_gateway_deployment.ob_deployment.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.ob_domain.domain_name}"
}

resource "aws_lambda_permission" "ob_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${local.name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.ob_deployment.execution_arn}/*/*"
}

resource "aws_cloudfront_distribution" "ob_distribution" {
  aliases = ["${local.domain}"]
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

    target_origin_id       = "${local.domain}"
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name = "${aws_s3_bucket.ob_bucket.website_endpoint}"
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

resource "aws_route53_zone" "ob_zone" {
  name = "${local.domain}."

  tags {
    Name = "${local.name}"
  }
}

resource "aws_route53_record" "ob_record" {
  name    = "${local.domain}."
  type    = "A"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.ob_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.ob_distribution.hosted_zone_id}"
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
