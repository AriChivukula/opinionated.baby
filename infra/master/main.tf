variable "NAME" {}

provider "aws" {}

locals {
  files = [
    {
      file  = "index.html"
      type = "text/html"
    },
    {
      file  = "index.js"
      type = "application/javascript"
    },
    {
      file  = "index.css"
      type = "text/css"
    },
    {
      file  = "images/favicon.png"
      type = "image/png"
    },
    {
      file  = "images/v0.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v1.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v2.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v3.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v4.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v5.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v6.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v7.jpg"
      type = "image/jpeg"
    },
    {
      file  = "images/v8.jpg"
      type = "image/jpeg"
    },
  ]
}

resource "aws_s3_bucket_object" "ob_object" {
  count  = "${length(local.files)}"
  bucket = "${var.NAME}"
  key    = "master/${lookup(local.files[count.index], "file")}"
  source = "static/${lookup(local.files[count.index], "file")}"
  acl    = "public-read"
  content_type = "${lookup(local.files[count.index], "type")}"
}
