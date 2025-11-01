# =============================================================================
# TERRAFORM OUTPUTS - Uday Pratap College Website
# =============================================================================
# Outputs provide important information after infrastructure is created
# Useful for CI/CD pipelines, documentation, and connecting resources
# =============================================================================

# =============================================================================
# Network Outputs
# =============================================================================

output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = module.vpc.private_subnet_ids
}

# =============================================================================
# EC2 Outputs
# =============================================================================

output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = module.ec2.instance_id
}

output "ec2_instance_public_ip" {
  description = "EC2 instance public IP address"
  value       = module.ec2.instance_public_ip
}

output "ec2_instance_private_ip" {
  description = "EC2 instance private IP address"
  value       = module.ec2.instance_private_ip
}

output "ec2_elastic_ip" {
  description = "Elastic IP address for EC2"
  value       = aws_eip.ec2_eip.public_ip
}

output "ec2_ssh_command" {
  description = "SSH command to connect to EC2 instance"
  value       = "ssh -i your-key.pem ubuntu@${aws_eip.ec2_eip.public_ip}"
}

output "ec2_instance_arn" {
  description = "ARN of the EC2 instance"
  value       = module.ec2.instance_arn
}

# =============================================================================
# RDS Outputs
# =============================================================================

output "rds_instance_id" {
  description = "RDS instance ID"
  value       = module.rds.db_instance_id
}

output "rds_endpoint" {
  description = "RDS instance endpoint"
  value       = module.rds.db_endpoint
  sensitive   = true
}

output "rds_host" {
  description = "RDS hostname"
  value       = module.rds.db_endpoint
  sensitive   = true
}

output "rds_port" {
  description = "RDS port"
  value       = module.rds.db_port
}

output "rds_database_name" {
  description = "RDS database name"
  value       = module.rds.db_name
  sensitive   = true
}

output "rds_username" {
  description = "RDS master username"
  value       = module.rds.db_username
  sensitive   = true
}

# Connection string for application (Don't print password!)
output "rds_connection_string" {
  description = "Database connection string (password hidden)"
  value       = "postgresql://${module.rds.db_username}:***@${module.rds.db_endpoint}/${module.rds.db_name}"
  sensitive   = true
}

# =============================================================================
# S3 Outputs
# =============================================================================

output "s3_bucket_id" {
  description = "ID of the S3 bucket"
  value       = module.s3.bucket_id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = module.s3.bucket_arn
}

output "s3_bucket_domain_name" {
  description = "Domain name of the S3 bucket"
  value       = module.s3.bucket_regional_domain_name
}

# =============================================================================
# CloudFront Outputs
# =============================================================================

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = module.cloudfront.domain_name
}

output "cloudfront_url" {
  description = "CloudFront URL for accessing the website"
  value       = "https://${module.cloudfront.domain_name}"
}

# =============================================================================
# Route53 Outputs
# =============================================================================

output "route53_zone_id" {
  description = "Route53 hosted zone ID"
  value       = module.route53.zone_id
}

output "route53_name_servers" {
  description = "Route53 name servers"
  value       = module.route53.name_servers
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

# =============================================================================
# KMS Outputs
# =============================================================================

output "kms_key_id" {
  description = "KMS key ID"
  value       = aws_kms_key.main.key_id
}

output "kms_key_arn" {
  description = "ARN of the main KMS key"
  value       = aws_kms_key.main.arn
}

output "kms_alias" {
  description = "KMS alias"
  value       = aws_kms_alias.main.name
}

# =============================================================================
# Security Outputs
# =============================================================================

output "security_group_id" {
  description = "Security group ID for EC2"
  value       = module.vpc.public_security_group_id
}

# =============================================================================
# CloudWatch Outputs
# =============================================================================

output "cloudwatch_log_group_name" {
  description = "CloudWatch log group name"
  value       = module.cloudwatch.log_group_name
}

output "cloudwatch_dashboard_url" {
  description = "CloudWatch dashboard URL"
  value       = "https://${var.aws_region}.console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${var.environment}-udaypratapcollege"
}

# =============================================================================
# Environment Outputs
# =============================================================================

output "environment" {
  description = "Current environment"
  value       = var.environment
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

# =============================================================================
# Deployment Outputs
# =============================================================================

output "deployment_info" {
  description = "Key deployment information"
  value = {
    environment        = var.environment
    region            = var.aws_region
    vpc_id           = module.vpc.vpc_id
    instance_ip      = aws_eip.ec2_eip.public_ip
    instance_id      = module.ec2.instance_id
    database_host    = module.rds.db_endpoint
    website_url      = "https://${var.domain_name}"
    cloudfront_url   = module.cloudfront.domain_name
    s3_bucket        = module.s3.bucket_id
    terraform_state  = "s3://udaypratapcollege-terraform-state/state/${terraform.workspace}/terraform.tfstate"
  }
  sensitive = true
}

# =============================================================================
# Quick Access Commands
# =============================================================================

output "useful_commands" {
  description = "Useful commands for managing the infrastructure"
  value = {
    ssh_to_instance = "ssh -i your-key.pem ubuntu@${aws_eip.ec2_eip.public_ip}"
    view_logs       = "aws logs tail /aws/ec2/${var.environment}-udaypratapcollege --follow"
    check_health    = "curl https://${var.domain_name}/api/health"
    connect_to_db   = "psql postgresql://${module.rds.db_username}:***@${module.rds.db_endpoint}/${module.rds.db_name}"
    terraform_state = "aws s3 ls s3://udaypratapcollege-terraform-state/state/${terraform.workspace}/"
    view_metrics    = "aws cloudwatch get-dashboard --dashboard-name ${var.environment}-udaypratapcollege"
  }
  sensitive = true
}

