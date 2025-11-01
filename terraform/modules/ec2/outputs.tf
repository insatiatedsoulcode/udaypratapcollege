output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.main.id
}

output "instance_public_ip" {
  description = "Public IP address"
  value       = aws_eip.main.public_ip
}

output "instance_private_ip" {
  description = "Private IP address"
  value       = aws_instance.main.private_ip
}

output "instance_arn" {
  description = "ARN of the EC2 instance"
  value       = aws_instance.main.arn
}

output "elastic_ip" {
  description = "Elastic IP"
  value       = aws_eip.main.public_ip
}

