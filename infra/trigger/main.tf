terraform {
  backend "s3" {}
}

variable "NAME" {}

variable "DOMAIN" {}

provider "aws" {}

data "aws_availability_zones" "ob_az" {}

resource "aws_vpc" "ob_vpc" {
  cidr_block = "192.168.0.0/16"

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_subnet" "ob_subnet" {
  count = "${length(data.aws_availability_zones.ob_az.names)}"
  cidr_block = "${cidrsubnet(aws_vpc.ob_vpc.cidr_block, 8, count.index)}"
  availability_zone = "${data.aws_availability_zones.ob_az.names[count.index]}"
  vpc_id = "${aws_vpc.ob_vpc.id}"
  map_public_ip_on_launch = true

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_internet_gateway" "ob_gateway" {
  vpc_id = "${aws_vpc.ob_vpc.id}"

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_route" "ob_route" {
  route_table_id = "${aws_vpc.ob_vpc.main_route_table_id}"
  gateway_id = "${aws_internet_gateway.ob_gateway.id}"
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_security_group" "ob_security" {
  name = "${var.NAME}"
  vpc_id = "${aws_vpc.ob_vpc.id}"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_acm_certificate" "ob_certificate" {
  domain_name = "${var.DOMAIN}"
  subject_alternative_names = ["*.${var.DOMAIN}"]
  validation_method = "DNS"

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_s3_bucket" "ob_bucket" {
  bucket = "${var.NAME}"
  force_destroy = true

  tags {
    Name = "${var.NAME}"
  }

  versioning {
    enabled = true
  }
}

resource "aws_route53_zone" "ob_zone" {
  name = "${var.DOMAIN}."

  tags {
    Name = "${var.NAME}"
  }
}

resource "aws_route53_record" "ob_record" {
  depends_on = [
    "aws_acm_certificate.ob_certificate",
  ]

  count = "${length(aws_acm_certificate.ob_certificate.domain_validation_options)}"
  name = "${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_name")}"
  records = ["${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_value")}"]
  ttl = 60
  type = "${lookup(aws_acm_certificate.ob_certificate.domain_validation_options[count.index], "resource_record_type")}"
  zone_id = "${aws_route53_zone.ob_zone.zone_id}"
}

resource "aws_acm_certificate_validation" "ob_validation" {
  certificate_arn = "${aws_acm_certificate.ob_certificate.arn}"
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

resource "aws_iam_role_policy_attachment" "ob_permission_lambda" {
  role = "${aws_iam_role.ob_iam.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "ob_permission_vpc" {
  role = "${aws_iam_role.ob_iam.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
