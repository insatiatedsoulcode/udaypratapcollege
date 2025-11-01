variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs"
  type        = list(string)
}

variable "allowed_security_groups" {
  description = "Allowed security groups"
  type        = list(string)
  default     = []
}

variable "allowed_cidr_blocks" {
  description = "Allowed CIDR blocks"
  type        = list(string)
  default     = []
}

variable "db_instance_class" {
  description = "DB instance class"
  type        = string
}

variable "db_allocated_storage" {
  description = "DB allocated storage"
  type        = number
}

variable "db_max_allocated_storage" {
  description = "DB max allocated storage"
  type        = number
  default     = 100
}

variable "db_engine_version" {
  description = "DB engine version"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
  sensitive   = true
}

variable "db_username" {
  description = "Master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Master password"
  type        = string
  sensitive   = true
}

variable "db_parameter_group_name" {
  description = "DB parameter group name"
  type        = string
}

variable "kms_key_id" {
  description = "KMS key ID"
  type        = string
}

variable "backup_retention_period" {
  description = "Backup retention period"
  type        = number
}

variable "backup_window" {
  description = "Backup window"
  type        = string
}

variable "maintenance_window" {
  description = "Maintenance window"
  type        = string
}

variable "tags" {
  description = "Tags to apply"
  type        = map(string)
  default     = {}
}

