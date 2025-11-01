# 🏗️ Terraform Infrastructure - Uday Pratap College

## 📋 Quick Start

```bash
# Initialize
terraform init

# Plan
terraform workspace new dev
terraform plan -var-file=environments/dev/terraform.tfvars

# Apply
terraform apply -var-file=environments/dev/terraform.tfvars

# Destroy
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## 📁 Structure

```
terraform/
├── main.tf              # Main infrastructure
├── variables.tf         # Input variables
├── outputs.tf           # Output values
├── modules/             # Reusable modules
└── environments/        # Environment configs
```

## 🔗 More Information

See [TERRAFORM_DEVOPS_GUIDE.md](../TERRAFORM_DEVOPS_GUIDE.md) for complete documentation.

