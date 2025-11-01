# Route53 Hosted Zone
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = merge(
    {
      Name = "${var.environment}-hosted-zone"
    },
    var.tags
  )
}

# A Record pointing to EC2
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = 300
  records = [var.ec2_instance_ip]
}

# A Record for www subdomain
resource "aws_route53_record" "www_sub" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
  ttl     = 300
  records = [var.ec2_instance_ip]
}

