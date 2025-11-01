# =============================================================================
# EC2 MODULE - Application Server
# =============================================================================
# EC2 provides virtual servers in the cloud
# This instance runs the Next.js application
# =============================================================================

# =============================================================================
# EC2 Instance
# =============================================================================
# Virtual server running Ubuntu 22.04
resource "aws_instance" "main" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  # Network configuration
  vpc_security_group_ids = var.security_group_ids
  subnet_id              = var.subnet_id

  # IAM Role for instance
  iam_instance_profile = var.iam_instance_profile

  # Root volume configuration
  root_block_device {
    volume_type = "gp3"      # Latest generation, better IOPS
    volume_size = 30         # 30 GB storage
    encrypted   = true       # Encrypt at rest
    kms_key_id  = var.kms_key_id

    tags = merge(
      {
        Name = "${var.environment}-root-volume"
        Type = "Root"
      },
      var.tags
    )
  }

  # Disable detailed monitoring (reduces cost)
  monitoring = false

  # User data script runs when instance boots
  # Used to install software and configure the server
  user_data = var.user_data
  user_data_replace_on_change = true # Recreate instance if user_data changes

  tags = merge(
    {
      Name        = "${var.environment}-udaypratapcollege-app"
      Description = "Next.js application server"
      Type        = "Application"
    },
    var.tags
  )
}

# =============================================================================
# Elastic IP
# =============================================================================
# Provides static public IP address
resource "aws_eip" "main" {
  domain   = "vpc"
  instance = aws_instance.main.id

  tags = merge(
    {
      Name = "${var.environment}-eip"
    },
    var.tags
  )

  depends_on = [aws_instance.main]
}

