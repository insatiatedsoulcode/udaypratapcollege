# =============================================================================
# MAIN TERRAFORM CONFIGURATION - Uday Pratap College Website
# =============================================================================
# This file defines the main infrastructure resources for the college website
# Infrastructure as Code (IaC) using Terraform on AWS
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  # Define required providers
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Terraform State Backend Configuration
  # Storing state remotely in S3 prevents conflicts when multiple developers work
  # This S3 bucket must be created manually first!
  backend "s3" {
    bucket         = "udaypratapcollege-terraform-state"
    key            = "state/${terraform.workspace}/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# =============================================================================
# AWS Provider Configuration
# =============================================================================
provider "aws" {
  region = var.aws_region

  # Default tags applied to all resources unless overridden
  # Tagging helps with cost allocation, resource organization, and automation
  default_tags {
    tags = {
      Project     = "UdayPratapCollege"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Repository  = "github.com/insatiatedsoulcode/udaypratapcollege"
    }
  }
}

# =============================================================================
# Data Sources - Fetch Existing Information
# =============================================================================

# Get information about available AWS Availability Zones in current region
# AZs are physically separate datacenters for high availability
data "aws_availability_zones" "available" {
  state = "available"
}

# Get the latest Ubuntu 22.04 LTS AMI (Amazon Machine Image)
# AMI is a template for launching EC2 instances
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical - official Ubuntu publisher

  filter {
    name   = "name"
    values = ["ubuntu/images/h-u-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

# =============================================================================
# Key Management Service (KMS) - Encryption at Rest
# =============================================================================
# KMS provides centralized key management for encryption
# Used to encrypt EBS volumes, RDS databases, and secrets
resource "aws_kms_key" "main" {
  description             = "KMS key for Uday Pratap College encryption"
  deletion_window_in_days = 30 # Key can be recovered within 30 days if deleted

  # Key usage for encryption/decryption
  enable_key_rotation = true

  tags = {
    Name        = "${var.environment}-udaypratapcollege-main-key"
    Description = "Main encryption key for all resources"
  }
}

# KMS Alias for easier reference
resource "aws_kms_alias" "main" {
  name          = "alias/${var.environment}-udaypratapcollege-main"
  target_key_id = aws_kms_key.main.key_id
}

# =============================================================================
# KMS Key for RDS Encryption
# =============================================================================
resource "aws_kms_key" "rds" {
  description             = "KMS key specifically for RDS database encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name        = "${var.environment}-rds-encryption-key"
    Description = "Database encryption key"
  }
}

resource "aws_kms_alias" "rds" {
  name          = "alias/${var.environment}-udaypratapcollege-rds"
  target_key_id = aws_kms_key.rds.key_id
}

# =============================================================================
# VPC Module - Virtual Private Cloud
# =============================================================================
# VPC creates an isolated network in AWS
# Public subnet: Resources with public IP, internet gateway access
# Private subnet: Resources without public IP, NAT gateway access for outbound
module "vpc" {
  source = "./modules/vpc"

  # VPC Configuration
  vpc_cidr = var.vpc_cidr
  vpc_name = "${var.environment}-udaypratapcollege-vpc"

  # Availability Zones for high availability
  availability_zones = data.aws_availability_zones.available.names

  # Public Subnet CIDRs (for load balancer, NAT gateway)
  public_subnet_cidrs = var.public_subnet_cidrs

  # Private Subnet CIDRs (for application servers, databases)
  private_subnet_cidrs = var.private_subnet_cidrs

  # Environment tag
  environment = var.environment

  # KMS Key for VPC Flow Logs encryption
  vpc_flow_logs_kms_key_id = aws_kms_key.main.arn

  tags = {
    ManagedBy = "Terraform"
  }
}

# =============================================================================
# IAM Module - Identity and Access Management
# =============================================================================
# IAM defines WHO can access WHAT resources and HOW
# Follows principle of least privilege
module "iam" {
  source = "./modules/iam"

  environment = var.environment
  account_id  = data.aws_caller_identity.current.account_id

  tags = {
    Purpose = "Service roles and policies"
  }
}

# Get current AWS account ID
data "aws_caller_identity" "current" {}

# =============================================================================
# S3 Bucket Module - Object Storage
# =============================================================================
# S3 stores static files, backups, and application data
# Highly durable (99.999999999%) and scalable
module "s3" {
  source = "./modules/s3"

  environment = var.environment
  kms_key_arn = aws_kms_key.main.arn

  tags = {
    Purpose = "Static assets and backups"
  }
}

# =============================================================================
# RDS Database Module - Managed PostgreSQL
# =============================================================================
# RDS provides managed database service
# Automatic backups, patching, and monitoring
module "rds" {
  source = "./modules/rds"

  environment = var.environment

  # VPC Configuration
  vpc_id                = module.vpc.vpc_id
  private_subnet_ids    = module.vpc.private_subnet_ids
  allowed_cidr_blocks   = [var.vpc_cidr] # Only allow access from VPC

  # Database Configuration
  db_instance_class       = var.rds_instance_class
  db_allocated_storage    = var.rds_allocated_storage
  db_engine_version       = var.rds_engine_version
  db_name                 = var.rds_database_name
  db_username             = var.rds_username
  db_password             = var.rds_password
  db_parameter_group_name = var.rds_parameter_group_name

  # Encryption
  kms_key_id = aws_kms_key.rds.arn

  # Backup Configuration
  backup_retention_period = var.rds_backup_retention_period
  backup_window          = var.rds_backup_window
  maintenance_window     = var.rds_maintenance_window

  tags = {
    Purpose = "Application database"
  }
}

# =============================================================================
# EC2 Instance Module - Application Server
# =============================================================================
# EC2 provides virtual servers in the cloud
# This instance runs the Next.js application
module "ec2" {
  source = "./modules/ec2"

  environment = var.environment

  # Instance Configuration
  ami_id        = data.aws_ami.ubuntu.id
  instance_type = var.ec2_instance_type
  key_name      = var.ec2_key_pair_name

  # Network Configuration
  vpc_id              = module.vpc.vpc_id
  subnet_id           = module.vpc.public_subnet_ids[0]
  security_group_ids  = [module.vpc.public_security_group_id]

  # IAM Role
  iam_instance_profile = module.iam.ec2_instance_profile_name

  # KMS for volume encryption
  kms_key_id = aws_kms_key.main.arn

  # User Data Script (runs on instance launch)
  # Downloads and runs bootstrap script
  user_data = templatefile("${path.module}/scripts/user-data.sh", {
    environment   = var.environment
    s3_bucket     = module.s3.bucket_id
    db_host       = module.rds.db_endpoint
    db_name       = var.rds_database_name
    db_user       = var.rds_username
    db_pass       = var.rds_password
    github_repo   = "https://github.com/insatiatedsoulcode/udaypratapcollege.git"
    github_branch = var.environment
  })

  tags = {
    Purpose = "Next.js application server"
  }
}

# =============================================================================
# CloudWatch Module - Monitoring and Logging
# =============================================================================
# CloudWatch provides metrics, logs, and alarms
# Critical for observability in production
module "cloudwatch" {
  source = "./modules/cloudwatch"

  environment       = var.environment
  instance_id       = module.ec2.instance_id
  rds_instance_id   = module.rds.db_instance_id
  sns_topic_arn     = module.iam.sns_topic_arn

  tags = {
    Purpose = "Monitoring and alerting"
  }
}

# =============================================================================
# Route53 Module - DNS Management
# =============================================================================
# Route53 manages domain name resolution
# Maps domain names to IP addresses and services
module "route53" {
  source = "./modules/route53"

  environment      = var.environment
  domain_name      = var.domain_name
  ec2_instance_ip  = module.ec2.instance_public_ip

  tags = {
    Purpose = "Domain name management"
  }
}

# =============================================================================
# CloudFront Module - Content Delivery Network
# =============================================================================
# CloudFront caches content at edge locations globally
# Reduces latency and server load
module "cloudfront" {
  source = "./modules/cloudfront"

  environment            = var.environment
  domain_name            = var.domain_name
  s3_bucket_domain_name  = module.s3.bucket_regional_domain_name
  origin_id              = "${var.environment}-s3-origin"
  allowed_cidr_blocks    = ["0.0.0.0/0"]
  enable_ssl_certificate = true

  tags = {
    Purpose = "Content delivery and caching"
  }
}

# =============================================================================
# EC2 Elastic IP - Static Public IP
# =============================================================================
# Elastic IP provides a static public IP address
# Prevents IP changes when instance stops/restarts
resource "aws_eip" "ec2_eip" {
  domain = "vpc"
  instance = module.ec2.instance_id

  tags = {
    Name        = "${var.environment}-udaypratapcollege-eip"
    Description = "Static IP for EC2 instance"
  }

  depends_on = [module.ec2]
}

