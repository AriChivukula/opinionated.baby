variable "NAME" {}

provider "aws" {}

locals {
  files = ["index.html", "index.js", "index.css", "images/favicon.png", "images/v0.jpg", "images/v1.jpg", "images/v2.jpg", "images/v3.jpg", "images/v4.jpg", "images/v5.jpg", "images/v6.jpg", "images/v7.jpg", "images/v8.jpg"]
}

resource "aws_s3_bucket_object" "ob_object" {
  count  = "${length(local.files)}"
  bucket = "${var.NAME}"
  key    = "master/${local.files[count.index]}"
  source = "static/${local.files[count.index]}"
  acl    = "public-read"
  content_type = "text/html"
}
