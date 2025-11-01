variable "environment" {
  description = "Environment name"
  type        = string
}

variable "domain_name" {
  description = "Domain name"
  type        = string
}

variable "s3_bucket_domain_name" {
  description = "S3 bucket domain name"
  type        = string
}

variable "origin_id" {
  description = "Origin ID"
  type        = string
}

variable "allowed_cidr_blocks" {
  description = "Allowed CIDR blocks"
  type        = list(string)
}

variable "enable_ssl_certificate" {
  description = "Enable SSL certificate"
  type        = bool
}

variable "cloudfront_min_ttl" {
  description = "Minimum TTL"
  type        = number
  default     = 0
}

variable "cloudfront_default_ttl" {
  description = "Default TTL"
  type        = number
  default     = 3600
}

variable "cloudfront_max_ttl" {
  description = "Maximum TTL"
  type        = number
  default     = 86400
}

variable "tags" {
  description = "Tags to apply"
  type        = map(string)
  default     = {}
}

