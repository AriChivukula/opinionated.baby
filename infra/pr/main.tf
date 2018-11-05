terraform {
  backend "s3" {}
}

variable "BRANCH" {}

variable "CLIENT_ID" {}

variable "CLIENT_SECRET" {}

variable "NAME" {}

variable "DOMAIN" {}

variable "LOCAL_DOMAIN" {}

variable "HONEYCOMB" {}

provider "aws" {}

data "aws_acm_certificate" "ob_certificate" {
  domain = "${var.DOMAIN}"
}

data "aws_s3_bucket" "ob_bucket" {
  bucket = "${var.NAME}"
}

data "aws_iam_role" "ob_iam" {
  name = "${var.NAME}"
}

data "aws_route53_zone" "ob_zone" {
  name = "${var.DOMAIN}."
}

data "aws_security_group" "ob_security" {
  name = "${var.NAME}"
}

data "aws_vpc" "ob_vpc" {
  filter {
    name = "tag:Name"
    values = ["${var.NAME}"]
  }
}

data "aws_subnet_ids" "ob_subnet" {
  vpc_id = "${data.aws_vpc.ob_vpc.id}"
  filter {
    name = "tag:Type"
    values = ["Private"]
  }
}

resource "aws_lambda_function" "ob_lambda" {
  function_name = "${var.NAME}-${var.BRANCH}"
  handler = "index.handler"
  role = "${data.aws_iam_role.ob_iam.arn}"
  runtime = "nodejs8.10"
  memory_size = 256
  timeout = 300
  filename = "dynamic.zip"
  publish = true
  source_code_hash = "${base64sha256(file("dynamic.zip"))}"

  environment {
    variables = {
      TF_VAR_CLIENT_ID = "${var.CLIENT_ID}"
      TF_VAR_CLIENT_SECRET = "${var.CLIENT_SECRET}"
      TF_VAR_NAME = "${var.NAME}"
      TF_VAR_DOMAIN = "${var.DOMAIN}"
      TF_VAR_BRANCH = "${var.BRANCH}"
      TF_VAR_HONEYCOMB = "${var.HONEYCOMB}"
      DEBUG = "*"
    }
  }
  
  vpc_config {
    subnet_ids = ["${data.aws_subnet_ids.ob_subnet.ids}"]
    security_group_ids = ["${data.aws_security_group.ob_security.id}"]
  }

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_api_gateway_rest_api" "ob_api" {
  name = "${var.NAME}-${var.BRANCH}"
}

resource "aws_api_gateway_resource" "ob_resource" {
  path_part = "{proxy+}"
  parent_id = "${aws_api_gateway_rest_api.ob_api.root_resource_id}"
  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
}

resource "aws_api_gateway_method" "ob_method" {
  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  resource_id = "${aws_api_gateway_resource.ob_resource.id}"
  http_method = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "ob_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  resource_id = "${aws_api_gateway_method.ob_method.resource_id}"
  http_method = "${aws_api_gateway_method.ob_method.http_method}"

  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = "${replace(aws_lambda_function.ob_lambda.invoke_arn, ":$LATEST", "")}"
}

resource "aws_api_gateway_integration_response" "ob_response" {
  depends_on = [
    "aws_api_gateway_integration.ob_integration",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  resource_id = "${aws_api_gateway_resource.ob_resource.id}"
  http_method = "${aws_api_gateway_method.ob_method.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_deployment" "ob_deployment" {
  depends_on = [
    "aws_api_gateway_integration_response.ob_response",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  stage_name = "PROD"
}

resource "aws_api_gateway_domain_name" "ob_gateway" {
  domain_name = "dynamic-${var.BRANCH}.${var.DOMAIN}"

  certificate_arn = "${data.aws_acm_certificate.ob_certificate.arn}"
}

resource "aws_api_gateway_base_path_mapping" "ob_map" {
  api_id = "${aws_api_gateway_rest_api.ob_api.id}"
  stage_name = "${aws_api_gateway_deployment.ob_deployment.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.ob_gateway.domain_name}"
}

resource "aws_lambda_permission" "ob_permission" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = "${var.NAME}-${var.BRANCH}"
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_deployment.ob_deployment.execution_arn}/*/*"
}

resource "aws_route53_record" "ob_record_dynamic" {
  name = "dynamic-${var.BRANCH}.${var.DOMAIN}."
  type = "A"
  zone_id = "${data.aws_route53_zone.ob_zone.zone_id}"

  alias {
    evaluate_target_health = false
    name = "${aws_api_gateway_domain_name.ob_gateway.cloudfront_domain_name}"
    zone_id = "${aws_api_gateway_domain_name.ob_gateway.cloudfront_zone_id}"
  }
}


locals {
  files = [
    {
      file = "index.html"
      type = "text/html"
    },
    {
      file = "index.js"
      type = "application/javascript"
    },
    {
      file = "index.css"
      type = "text/css"
    },
    {
      file = "images/favicon.png"
      type = "image/png"
    },
    {
      file = "images/v0.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v1.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v2.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v3.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v4.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v5.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v6.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v7.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v8.jpg"
      type = "image/jpeg"
    },
    {
      file = "images/v9.jpg"
      type = "image/jpeg"
    },
  ]
}

resource "aws_s3_bucket_object" "ob_object" {
  count = "${length(local.files)}"
  bucket = "${var.NAME}"
  key = "${var.BRANCH}/${lookup(local.files[count.index], "file")}"
  source = "static/${lookup(local.files[count.index], "file")}"
  acl = "public-read"
  content_type = "${lookup(local.files[count.index], "type")}"
  etag = "${md5(file("static/${lookup(local.files[count.index], "file")}"))}"
}

resource "aws_cloudfront_distribution" "ob_distribution" {
  aliases = ["${var.LOCAL_DOMAIN}"]
  enabled = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods = ["POST", "HEAD", "PATCH", "DELETE", "PUT", "GET", "OPTIONS"]
    cached_methods = ["HEAD", "GET", "OPTIONS"]
    compress = false
    default_ttl = 0

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = "false"
    }

    target_origin_id = "${var.LOCAL_DOMAIN}"
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name = "${data.aws_s3_bucket.ob_bucket.bucket_domain_name}"
    origin_id = "${var.LOCAL_DOMAIN}"
    origin_path = "/${var.BRANCH}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
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
    acm_certificate_arn = "${data.aws_acm_certificate.ob_certificate.arn}"
    ssl_support_method = "sni-only"
  }
}

resource "aws_route53_record" "ob_record_static" {
  name = "${var.LOCAL_DOMAIN}."
  type = "A"
  zone_id = "${data.aws_route53_zone.ob_zone.zone_id}"

  alias {
    evaluate_target_health = false
    name = "${aws_cloudfront_distribution.ob_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.ob_distribution.hosted_zone_id}"
  }
}
