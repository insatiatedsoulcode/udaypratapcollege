# 🚀 Terraform DevOps Guide - Uday Pratap College Website

## 📚 Complete Infrastructure as Code Setup

यह guide आपको DevOps सिखाने के लिए production-ready Terraform infrastructure प्रदान करता है।

---

## 🎯 What's Included

### **Infrastructure Components (Terraform)**

✅ **VPC** - Virtual Private Cloud with public/private subnets  
✅ **EC2** - Application server for Next.js app  
✅ **RDS** - PostgreSQL database  
✅ **S3** - Static assets and backup storage  
✅ **IAM** - Roles and policies for security  
✅ **KMS** - Key Management for encryption  
✅ **CloudWatch** - Monitoring and logging  
✅ **Route53** - DNS management  
✅ **CloudFront** - CDN and caching  
✅ **Security Groups** - Network firewalls  
✅ **NAT Gateway** - Internet access for private subnets  

### **CI/CD Pipeline (GitHub Actions)**

✅ **Automated builds**  
✅ **Testing**  
✅ **Terraform planning**  
✅ **Approval gates**  
✅ **Infrastructure deployment**  
✅ **Application deployment**  
✅ **Health checks**  
✅ **Notifications**  

---

## 📁 Project Structure

```
terraform/
├── main.tf                 # Main infrastructure definition
├── variables.tf            # Input variables
├── outputs.tf              # Output values
├── terraform.tfvars        # Variable values (gitignored)
│
├── modules/
│   ├── vpc/
│   │   ├── main.tf         # VPC, subnets, routing
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── ec2/
│   │   ├── main.tf         # EC2 instance
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── rds/
│   │   ├── main.tf         # PostgreSQL database
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── s3/
│   │   ├── main.tf         # S3 buckets
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── iam/
│   │   ├── main.tf         # IAM roles
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── cloudwatch/
│   │   ├── main.tf         # Monitoring
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── route53/
│   │   ├── main.tf         # DNS
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── cloudfront/
│       ├── main.tf         # CDN
│       ├── variables.tf
│       └── outputs.tf
│
├── environments/
│   ├── dev/
│   │   └── terraform.tfvars
│   ├── staging/
│   │   └── terraform.tfvars
│   └── prod/
│       └── terraform.tfvars
│
└── scripts/
    └── user-data.sh        # EC2 bootstrap script
```

---

## 🚀 Quick Start

### **Prerequisites**

```bash
# Install Terraform
brew install terraform  # macOS
# OR download from: https://terraform.io/downloads

# Verify installation
terraform version

# Install AWS CLI
brew install awscli
aws configure

# Install Node.js
brew install node
npm --version
```

### **Setup AWS Resources**

#### **Step 1: Create S3 Bucket for Terraform State**

```bash
# Create S3 bucket for storing Terraform state
aws s3 mb s3://udaypratapcollege-terraform-state --region ap-south-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket udaypratapcollege-terraform-state \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name terraform-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region ap-south-1
```

#### **Step 2: Create EC2 Key Pair**

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/udaypratapcollege-key

# Create EC2 key pair in AWS
aws ec2 import-key-pair \
  --key-name udaypratapcollege-dev-key \
  --public-key-material fileb://~/.ssh/udaypratapcollege-key.pub \
  --region ap-south-1
```

#### **Step 3: Configure Variables**

```bash
cd terraform/environments/dev

# Update terraform.tfvars with your values
nano terraform.tfvars

# Important values to change:
# - ec2_key_pair_name
# - rds_password
# - allowed_ssh_cidr_blocks
```

### **Initialize and Apply Terraform**

```bash
cd terraform

# Initialize Terraform
terraform init

# Select workspace
terraform workspace new dev
terraform workspace select dev

# Review the plan
terraform plan -var-file=environments/dev/terraform.tfvars

# Apply the configuration
terraform apply -var-file=environments/dev/terraform.tfvars

# View outputs
terraform output
```

---

## 📖 Understanding Each AWS Service

### **1. VPC (Virtual Private Cloud)**

**Purpose**: Creates an isolated network in AWS

**DevOps Concept**: Network security and isolation

**What it does**:
- Provides private network space in AWS
- Public subnets for internet-facing resources
- Private subnets for databases and internal services
- Internet Gateway for public access
- NAT Gateway for private subnet outbound access
- Security Groups act as firewalls

**Why important**:
- Isolates your infrastructure from others
- Controls network traffic flow
- Enables security best practices

---

### **2. EC2 (Elastic Compute Cloud)**

**Purpose**: Virtual servers for running applications

**DevOps Concept**: Infrastructure provisioning

**What it does**:
- Launches virtual machines (instances)
- Runs your Next.js application
- Configurable CPU, memory, storage
- Auto-scaling capabilities
- Pay only for what you use

**Why important**:
- Core compute resource
- Full control over the environment
- Scalable and flexible

---

### **3. RDS (Relational Database Service)**

**Purpose**: Managed database service

**DevOps Concept**: Infrastructure as a Service

**What it does**:
- Managed PostgreSQL/MySQL database
- Automatic backups
- Automatic patching
- High availability
- Read replicas for scaling

**Why important**:
- Reduces operational overhead
- Built-in monitoring and alerts
- Point-in-time recovery

---

### **4. S3 (Simple Storage Service)**

**Purpose**: Object storage for files

**DevOps Concept**: Decoupled storage

**What it does**:
- Stores static files, images, backups
- 99.999999999% durability
- Versioning for file history
- Lifecycle policies for cost optimization
- Access control and encryption

**Why important**:
- Reliable storage
- Scalable to unlimited size
- Cost-effective for static assets

---

### **5. IAM (Identity and Access Management)**

**Purpose**: User and resource access control

**DevOps Concept**: Least privilege principle

**What it does**:
- Defines WHO can access WHAT
- Roles for services (EC2, Lambda, etc.)
- Policies define permissions
- Multi-factor authentication
- Access auditing

**Why important**:
- Security foundation
- Prevents unauthorized access
- Compliance requirements

---

### **6. KMS (Key Management Service)**

**Purpose**: Encryption key management

**DevOps Concept**: Defense in depth

**What it does**:
- Creates and manages encryption keys
- Encrypts data at rest
- Rotates keys automatically
- CloudTrail logging
- Cross-region key replication

**Why important**:
- Protects sensitive data
- Regulatory compliance
- Prevents data breaches

---

### **7. CloudWatch**

**Purpose**: Monitoring and observability

**DevOps Concept**: Observability pillar

**What it does**:
- Collects metrics (CPU, memory, etc.)
- Stores application logs
- Sets up alarms
- Creates dashboards
- Auto-scaling triggers

**Why important**:
- Proactive issue detection
- Performance optimization
- Incident response

---

### **8. Route53**

**Purpose**: Domain Name System (DNS)

**DevOps Concept**: Service discovery

**What it does**:
- Maps domain names to IP addresses
- Health checks
- Failover routing
- Latency-based routing
- Private DNS

**Why important**:
- Reliable domain management
- High availability
- Global traffic routing

---

### **9. CloudFront**

**Purpose**: Content Delivery Network

**DevOps Concept**: Performance optimization

**What it does**:
- Caches content at edge locations
- Reduces latency globally
- Reduces origin server load
- DDoS protection
- SSL/TLS termination

**Why important**:
- Faster content delivery
- Lower costs
- Better user experience

---

## 🔄 CI/CD Pipeline Flow

### **1. Code Push**
```
Developer pushes code → GitHub triggers workflow
```

### **2. Build & Test**
```
GitHub Actions:
├── Checkout code
├── Install dependencies
├── Run linting
├── Type checking
├── Run tests
└── Build application
```

### **3. Terraform Plan**
```
GitHub Actions:
├── Init Terraform
├── Validate code
├── Select workspace (dev/staging/prod)
└── Create infrastructure plan
```

### **4. Approval Gate** (Production only)
```
Manual review required → Approve or reject
```

### **5. Infrastructure Deployment**
```
GitHub Actions:
├── Apply Terraform
├── Create/Update resources
├── Save state to S3
└── Output resource information
```

### **6. Application Deployment**
```
GitHub Actions:
├── SSH to EC2 instance
├── Pull latest code
├── Install dependencies
├── Build application
├── Restart with PM2
└── Health check verification
```

### **7. Notification**
```
Send success/failure notification
```

---

## 📚 DevOps Learning Concepts

### **Infrastructure as Code (IaC)**

**What**: Define infrastructure in code (Terraform, CloudFormation)

**Benefits**:
- Version controlled
- Reproducible
- Testable
- Documented
- Faster deployments

**Example**: Our Terraform configs define entire AWS infrastructure

---

### **CI/CD (Continuous Integration/Continuous Deployment)**

**What**: Automate testing and deployment

**CI (Continuous Integration)**:
- Build on every commit
- Run tests automatically
- Catch issues early

**CD (Continuous Deployment)**:
- Deploy to production automatically
- Reduce manual errors
- Faster releases

**Example**: GitHub Actions workflow

---

### **Monitoring & Observability**

**Three Pillars**:
1. **Metrics** - Numerical data (CPU, memory)
2. **Logs** - Time-stamped events
3. **Traces** - Request flow through system

**Example**: CloudWatch dashboards and alarms

---

### **Security Best Practices**

1. **Least Privilege** - Minimum required permissions
2. **Encryption** - Data at rest and in transit
3. **Network Segmentation** - Private vs public subnets
4. **Secrets Management** - Never commit credentials
5. **Regular Updates** - Patch vulnerabilities

**Example**: IAM roles, KMS encryption, Security Groups

---

### **Disaster Recovery**

**Components**:
1. **Backups** - Regular automated backups
2. **Snapshots** - Point-in-time copies
3. **Replication** - Multi-AZ deployment
4. **Recovery Time Objective (RTO)** - Max downtime
5. **Recovery Point Objective (RPO)** - Max data loss

**Example**: RDS automated backups, S3 versioning

---

## 🛠️ Common Terraform Commands

```bash
# Initialize
terraform init

# Format code
terraform fmt

# Validate configuration
terraform validate

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy infrastructure
terraform destroy

# Workspace management
terraform workspace list
terraform workspace new prod
terraform workspace select dev

# View outputs
terraform output

# View state
terraform state list
terraform state show resource_name

# Import existing resource
terraform import aws_instance.main i-1234567890abcdef0
```

---

## 🔐 Security Best Practices

### **1. Remote State**

**What**: Store Terraform state in S3

**Why**: 
- Prevents conflicts in teams
- Centralized state management
- State locking with DynamoDB

**How**: Defined in `backend "s3"` block

---

### **2. Sensitive Variables**

**What**: Mark variables as `sensitive = true`

**Why**: 
- Prevents accidental exposure in logs
- Not printed in console

**Example**: `rds_password` variable

---

### **3. Least Privilege IAM**

**What**: Minimum required permissions

**Why**: Reduces attack surface

**Example**: EC2 role can only access specific S3 bucket

---

### **4. Encryption at Rest**

**What**: Encrypt all data storage

**Where**: 
- EBS volumes
- RDS databases
- S3 buckets

**How**: Using KMS keys

---

### **5. Security Groups**

**What**: Firewall rules

**Best Practice**:
- Deny by default
- Allow specific IPs for SSH
- Open ports only when needed

---

## 💰 Cost Optimization

### **Free Tier Eligible Resources**

| Service | Free Tier | Our Setup |
|---------|-----------|-----------|
| EC2 | 750 hrs/month t2.micro | t3.micro eligible |
| RDS | 750 hrs/month db.t2.micro | db.t3.micro eligible |
| S3 | 5GB storage | Pay per GB |
| CloudWatch | 10 custom metrics | Basic monitoring |

### **Estimated Monthly Costs**

**Development Environment:**
- EC2 t3.small: ~$15/month
- RDS db.t3.micro: ~$15/month
- S3 storage: ~$0.50/month
- NAT Gateway: ~$32/month
- CloudFront: ~$1/month
- **Total: ~$63/month**

**Production Environment:**
- EC2 t3.large: ~$60/month
- RDS db.t3.medium: ~$100/month
- S3 storage: ~$5/month
- NAT Gateway: ~$32/month
- CloudFront: ~$10/month
- **Total: ~$207/month**

---

## 🎓 Learning Exercises

### **Exercise 1: Understanding Terraform State**

```bash
# View current state
terraform state list

# Show specific resource
terraform state show module.ec2.aws_instance.main

# Move resource
terraform state mv aws_instance.old aws_instance.new

# Remove from state
terraform state rm aws_instance.main
```

### **Exercise 2: Modifying Infrastructure**

```bash
# Change instance type in terraform.tfvars
# Run plan to see impact
terraform plan -var-file=environments/dev/terraform.tfvars

# Apply changes
terraform apply -var-file=environments/dev/terraform.tfvars
```

### **Exercise 3: Multi-Environment Setup**

```bash
# Create dev environment
terraform workspace new dev
terraform apply -var-file=environments/dev/terraform.tfvars

# Create staging environment
terraform workspace new staging
terraform apply -var-file=environments/staging/terraform.tfvars

# Switch between environments
terraform workspace select dev
terraform workspace select staging
```

---

## 🐛 Troubleshooting

### **State Lock**

```bash
# If state is locked
terraform force-unlock LOCK_ID

# List locks
aws dynamodb scan --table-name terraform-state-lock
```

### **State Mismatch**

```bash
# Refresh state
terraform refresh

# Reconcile differences
terraform plan -refresh=false
```

### **Provider Issues**

```bash
# Update providers
terraform init -upgrade

# Check provider versions
terraform providers
```

---

## 📖 Next Steps

1. **Practice**: Modify configurations and observe changes
2. **Experiment**: Add new resources or modules
3. **Monitor**: Set up CloudWatch dashboards
4. **Optimize**: Review costs and performance
5. **Learn**: Read AWS documentation

---

## 🔗 Useful Resources

- [Terraform Documentation](https://terraform.io/docs)
- [AWS Documentation](https://docs.aws.amazon.com)
- [GitHub Actions](https://docs.github.com/en/actions)
- [DevOps Best Practices](https://aws.amazon.com/devops)

---

**Happy Learning! 🚀**

