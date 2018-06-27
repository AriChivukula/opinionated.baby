variable "NAME" {}

provider "aws" {}

locals {
  files = {
    ["index.html", "text/html"],
    ["index.js", "application/javascript"],
    ["index.css", "text/css"],
    ["images/favicon.png", "image/png"],
    ["images/v0.jpg", "image/jpeg"],
    ["images/v1.jpg", "image/jpeg"],
    ["images/v2.jpg", "image/jpeg"],
    ["images/v3.jpg", "image/jpeg"],
    ["images/v4.jpg", "image/jpeg"],
    ["images/v5.jpg", "image/jpeg"],
    ["images/v6.jpg", "image/jpeg"],
    ["images/v7.jpg", "image/jpeg"],
    ["images/v8.jpg", "image/jpeg"],
  }
}

resource "aws_s3_bucket_object" "ob_object" {
  count  = "${length(local.files)}"
  bucket = "${var.NAME}"
  key    = "master/${local.files[count.index][0]}"
  source = "static/${local.files[count.index][0]}"
  acl    = "public-read"
  content_type = "${local.files[count.index][1]}"
}
