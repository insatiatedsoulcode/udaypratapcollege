# =============================================================================
# TERRAFORM VARIABLES - Uday Pratap College Website
# =============================================================================
# Variables make Terraform configurations reusable and flexible
# Can be overridden via .tfvars files or command line flags
# =============================================================================

# =============================================================================
# Core Infrastructure Variables
# =============================================================================

variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "ap-south-1" # Mumbai region

  validation {
    condition = contains([
      "us-east-1", "us-west-2", "eu-west-1",
      "ap-south-1", "ap-southeast-1"
    ], var.aws_region)
    error_message = "AWS region must be a valid AWS region code."
  }
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "udaypratapcollege"
}

# =============================================================================
# VPC and Networking Variables
# =============================================================================

variable "vpc_cidr" {
  description = "CIDR block for VPC (e.g., 10.0.0.0/16)"
  type        = string
  default     = "10.0.0.0/16"

  validation {
    condition     = can(cidrhost(var.vpc_cidr, 0))
    error_message = "VPC CIDR must be a valid CIDR block."
  }
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets (one per AZ)"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]

  validation {
    condition     = length(var.public_subnet_cidrs) >= 2
    error_message = "At least 2 public subnets required for high availability."
  }
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets (one per AZ)"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]

  validation {
    condition     = length(var.private_subnet_cidrs) >= 2
    error_message = "At least 2 private subnets required for high availability."
  }
}

# =============================================================================
# EC2 Instance Variables
# =============================================================================

variable "ec2_instance_type" {
  description = "EC2 instance type for application server"
  type        = string
  default     = "t3.medium" # 2 vCPU, 4GB RAM

  # Common instance types:
  # t3.micro (1 vCPU, 1GB) - Free tier
  # t3.small (2 vCPU, 2GB) - Small apps
  # t3.medium (2 vCPU, 4GB) - Medium apps
  # t3.large (2 vCPU, 8GB) - Large apps
}

variable "ec2_key_pair_name" {
  description = "Name of AWS EC2 Key Pair for SSH access"
  type        = string

  validation {
    condition     = length(var.ec2_key_pair_name) > 0
    error_message = "EC2 key pair name is required."
  }
}

variable "ec2_root_volume_size" {
  description = "Size of EC2 root volume in GB"
  type        = number
  default     = 30

  validation {
    condition     = var.ec2_root_volume_size >= 20
    error_message = "Root volume must be at least 20GB."
  }
}

variable "ec2_root_volume_type" {
  description = "EC2 root volume type (gp3, gp2, io1)"
  type        = string
  default     = "gp3" # Latest generation, better performance than gp2
}

# =============================================================================
# RDS Database Variables
# =============================================================================

variable "rds_instance_class" {
  description = "RDS instance class (db.t3.micro, db.t3.small, etc.)"
  type        = string
  default     = "db.t3.micro"

  # Common RDS instance types:
  # db.t3.micro (1 vCPU, 1GB) - Free tier
  # db.t3.small (2 vCPU, 2GB) - Small DBs
  # db.t3.medium (2 vCPU, 4GB) - Medium DBs
  # db.r6g.large (2 vCPU, 16GB) - Large DBs
}

variable "rds_allocated_storage" {
  description = "RDS allocated storage in GB"
  type        = number
  default     = 20

  validation {
    condition     = var.rds_allocated_storage >= 20
    error_message = "RDS storage must be at least 20GB."
  }
}

variable "rds_max_allocated_storage" {
  description = "RDS maximum allocated storage for autoscaling"
  type        = number
  default     = 100
}

variable "rds_engine_version" {
  description = "PostgreSQL engine version"
  type        = string
  default     = "15.4"
}

variable "rds_database_name" {
  description = "Name of the database to create"
  type        = string
  default     = "udaypratapcollege"
  sensitive   = true
}

variable "rds_username" {
  description = "Master username for RDS"
  type        = string
  default     = "admin"
  sensitive   = true
}

variable "rds_password" {
  description = "Master password for RDS"
  type        = string
  sensitive   = true

  validation {
    condition     = length(var.rds_password) >= 12
    error_message = "RDS password must be at least 12 characters."
  }
}

variable "rds_backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7

  validation {
    condition     = var.rds_backup_retention_period >= 0 && var.rds_backup_retention_period <= 35
    error_message = "Backup retention must be between 0 and 35 days."
  }
}

variable "rds_backup_window" {
  description = "Preferred backup window (UTC)"
  type        = string
  default     = "03:00-04:00" # 3 AM - 4 AM UTC
}

variable "rds_maintenance_window" {
  description = "Preferred maintenance window (UTC)"
  type        = string
  default     = "sun:04:00-sun:05:00" # Sunday 4 AM - 5 AM UTC
}

variable "rds_parameter_group_name" {
  description = "RDS parameter group name"
  type        = string
  default     = "default.postgres15"
}

# =============================================================================
# S3 Variables
# =============================================================================

variable "s3_bucket_name" {
  description = "Name of S3 bucket for static assets"
  type        = string
  default     = "" # Will be auto-generated if empty
}

variable "s3_force_destroy" {
  description = "Force destroy S3 bucket even if it contains objects"
  type        = bool
  default     = false
}

# =============================================================================
# CloudFront Variables
# =============================================================================

variable "cloudfront_price_class" {
  description = "CloudFront price class (PriceClass_All, PriceClass_200, PriceClass_100)"
  type        = string
  default     = "PriceClass_100" # Only serve from cheapest edge locations

  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.cloudfront_price_class)
    error_message = "Price class must be one of: PriceClass_All, PriceClass_200, PriceClass_100."
  }
}

variable "cloudfront_min_ttl" {
  description = "Minimum TTL for cached content (seconds)"
  type        = number
  default     = 0
}

variable "cloudfront_default_ttl" {
  description = "Default TTL for cached content (seconds)"
  type        = number
  default     = 3600 # 1 hour
}

variable "cloudfront_max_ttl" {
  description = "Maximum TTL for cached content (seconds)"
  type        = number
  default     = 86400 # 24 hours
}

# =============================================================================
# Route53 Variables
# =============================================================================

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = "udaypratapcollege.com"
}

# =============================================================================
# Security Variables
# =============================================================================

variable "allowed_ssh_cidr_blocks" {
  description = "CIDR blocks allowed for SSH access"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Warning: Restrict this in production!

  validation {
    condition     = length(var.allowed_ssh_cidr_blocks) > 0
    error_message = "At least one SSH CIDR block must be specified."
  }
}

variable "enable_detailed_monitoring" {
  description = "Enable detailed CloudWatch monitoring (1-minute intervals)"
  type        = bool
  default     = false # Costs more but provides better metrics

  # Standard monitoring: Free, 5-minute intervals
  # Detailed monitoring: ~$2.10/month per instance, 1-minute intervals
}

# =============================================================================
# Notification Variables
# =============================================================================

variable "alert_email" {
  description = "Email address for CloudWatch alarms"
  type        = string
  default     = "admin@udaypratapcollege.com"

  validation {
    condition     = can(regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", var.alert_email))
    error_message = "Alert email must be a valid email address."
  }
}

# =============================================================================
# Application Variables
# =============================================================================

variable "github_repo_url" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/insatiatedsoulcode/udaypratapcollege.git"
}

variable "github_branch" {
  description = "GitHub branch to deploy"
  type        = string
  default     = "master"
}

# =============================================================================
# Tags
# =============================================================================

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "UdayPratapCollege"
    Application = "CollegeWebsite"
    Team        = "DevOps"
  }
}

