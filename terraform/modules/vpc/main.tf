# =============================================================================
# VPC MODULE - Virtual Private Cloud
# =============================================================================
# VPC creates an isolated virtual network in AWS
# Think of it as your own private cloud within AWS
# Resources inside VPC are isolated from other VPCs
# =============================================================================

# =============================================================================
# VPC Resource
# =============================================================================
# Main network container that spans your Availability Zones
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr # IPv4 address range (e.g., 10.0.0.0/16 = 65k IPs)

  # DNS resolution - translates domain names to IP addresses
  enable_dns_hostnames = true
  enable_dns_support   = true

  # Tags for identification
  tags = merge(
    {
      Name = var.vpc_name
      Type = "VPC"
    },
    var.tags
  )
}

# =============================================================================
# Internet Gateway
# =============================================================================
# Allows resources in VPC to communicate with the internet
# Attached to VPC, provides NAT functionality for public subnets
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(
    {
      Name = "${var.vpc_name}-igw"
      Type = "InternetGateway"
    },
    var.tags
  )
}

# =============================================================================
# Public Subnets
# =============================================================================
# Subnets that can directly communicate with the internet
# Used for load balancers, NAT gateways, bastion hosts
resource "aws_subnet" "public" {
  count = length(var.public_subnet_cidrs)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  # Auto-assign public IPv4 addresses
  map_public_ip_on_launch = true

  tags = merge(
    {
      Name                     = "${var.vpc_name}-public-subnet-${count.index + 1}"
      Type                     = "Public"
      "kubernetes.io/role/elb" = "1" # For Kubernetes compatibility
    },
    var.tags
  )
}

# =============================================================================
# Private Subnets
# =============================================================================
# Subnets that cannot directly access the internet
# Used for application servers, databases
# Outbound internet access via NAT Gateway
resource "aws_subnet" "private" {
  count = length(var.private_subnet_cidrs)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = merge(
    {
      Name                          = "${var.vpc_name}-private-subnet-${count.index + 1}"
      Type                          = "Private"
      "kubernetes.io/role/internal-elb" = "1"
    },
    var.tags
  )
}

# =============================================================================
# Elastic IP for NAT Gateway
# =============================================================================
# Static IP address for NAT Gateway
# Required for NAT Gateway to function
resource "aws_eip" "nat" {
  domain = "vpc"

  # Reuse Elastic IP if NAT Gateway is recreated
  tags = merge(
    {
      Name = "${var.vpc_name}-nat-eip"
    },
    var.tags
  )

  depends_on = [aws_internet_gateway.main]
}

# =============================================================================
# NAT Gateway
# =============================================================================
# Allows resources in private subnets to access the internet
# Only for outbound connections (download updates, API calls)
# Prevents inbound access (increases security)
resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id # Place in first public subnet

  tags = merge(
    {
      Name = "${var.vpc_name}-nat-gw"
    },
    var.tags
  )

  depends_on = [aws_internet_gateway.main]
}

# =============================================================================
# Route Table for Public Subnets
# =============================================================================
# Routing rules for public subnets
# Directs traffic through Internet Gateway
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  # Route all internet traffic (0.0.0.0/0) through Internet Gateway
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(
    {
      Name = "${var.vpc_name}-public-rt"
    },
    var.tags
  )
}

# Associate public subnets with public route table
resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# =============================================================================
# Route Table for Private Subnets
# =============================================================================
# Routing rules for private subnets
# Directs outbound traffic through NAT Gateway
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  # Route outbound traffic through NAT Gateway
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = merge(
    {
      Name = "${var.vpc_name}-private-rt"
    },
    var.tags
  )
}

# Associate private subnets with private route table
resource "aws_route_table_association" "private" {
  count = length(aws_subnet.private)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}

# =============================================================================
# VPC Flow Logs
# =============================================================================
# Captures IP traffic flow information
# Useful for troubleshooting, security analysis, compliance
resource "aws_flow_log" "vpc" {
  iam_role_arn    = aws_iam_role.vpc_flow_log.arn
  log_destination = aws_cloudwatch_log_group.vpc_flow_log.arn
  traffic_type    = "ALL" # Capture all traffic (ACCEPT, REJECT, ALL)
  vpc_id          = aws_vpc.main.id

  tags = merge(
    {
      Name = "${var.vpc_name}-flow-logs"
    },
    var.tags
  )
}

# CloudWatch Log Group for VPC Flow Logs
resource "aws_cloudwatch_log_group" "vpc_flow_log" {
  name              = "/aws/vpc/flowlogs/${var.vpc_name}"
  retention_in_days = 7 # Keep logs for 7 days

  kms_key_id = var.vpc_flow_logs_kms_key_id

  tags = var.tags
}

# =============================================================================
# IAM Role for VPC Flow Logs
# =============================================================================
resource "aws_iam_role" "vpc_flow_log" {
  name = "${var.vpc_name}-flow-logs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

# IAM Policy for VPC Flow Logs
resource "aws_iam_role_policy" "vpc_flow_log" {
  name = "${var.vpc_name}-flow-logs-policy"
  role = aws_iam_role.vpc_flow_log.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "${aws_cloudwatch_log_group.vpc_flow_log.arn}:*"
      }
    ]
  })
}

# =============================================================================
# Security Group for Public Subnet
# =============================================================================
# Virtual firewall controlling inbound/outbound traffic
resource "aws_security_group" "public" {
  name        = "${var.vpc_name}-public-sg"
  description = "Security group for public subnet resources"
  vpc_id      = aws_vpc.main.id

  # Inbound rules - what traffic is allowed IN
  ingress {
    description = "SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Warning: Restrict in production!
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Next.js app"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound rules - what traffic is allowed OUT
  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # All protocols
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    {
      Name = "${var.vpc_name}-public-sg"
    },
    var.tags
  )
}

# Security Group for Private Subnet
resource "aws_security_group" "private" {
  name        = "${var.vpc_name}-private-sg"
  description = "Security group for private subnet resources"
  vpc_id      = aws_vpc.main.id

  # Allow traffic from public security group
  ingress {
    description     = "Traffic from public subnet"
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.public.id]
  }

  # Allow outbound internet access
  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    {
      Name = "${var.vpc_name}-private-sg"
    },
    var.tags
  )
}

