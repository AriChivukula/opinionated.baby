variable "NAME" {}

provider "aws" {}

resource "aws_s3_bucket_object" "ob_object" {
  count  = "${length(local.files)}"
  bucket = "${var.NAME}"
  key    = "master/${local.files[count.index]}"
  source = "static/${local.files[count.index]}"
  acl    = "public-read"
}
