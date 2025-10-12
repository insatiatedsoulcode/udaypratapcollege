#!/bin/bash

# Monitoring script for Uday Pratap College website
# This script monitors the health and performance of the application

set -e

# Configuration
APP_NAME="udaypratapcollege"
APP_DIR="/home/ubuntu/$APP_NAME"
LOG_FILE="/var/log/monitoring.log"
ALERT_EMAIL="admin@udaypratapcollege.com"

# Create log directory if it doesn't exist
sudo mkdir -p /var/log
sudo touch $LOG_FILE
sudo chown ubuntu:ubuntu $LOG_FILE

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Function to send alert
send_alert() {
    local subject="$1"
    local message="$2"
    
    log "ALERT: $subject - $message"
    
    # Send email alert (requires mailutils)
    if command -v mail >/dev/null 2>&1; then
        echo "$message" | mail -s "$subject" "$ALERT_EMAIL"
    fi
}

# Function to check container health
check_containers() {
    log "Checking container health..."
    
    cd $APP_DIR
    
    # Check if containers are running
    if ! docker-compose ps | grep -q "Up"; then
        send_alert "Container Down" "One or more containers are not running"
        log "Attempting to restart containers..."
        docker-compose up -d
        sleep 30
    else
        log "✅ All containers are running"
    fi
}

# Function to check application health
check_application_health() {
    log "Checking application health..."
    
    # Check health endpoint
    if ! curl -f -s http://localhost:3000/api/health > /dev/null; then
        send_alert "Application Unhealthy" "Health check endpoint is not responding"
        return 1
    else
        log "✅ Application health check passed"
    fi
    
    # Check response time
    response_time=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:3000/)
    if (( $(echo "$response_time > 5.0" | bc -l) )); then
        send_alert "High Response Time" "Application response time is ${response_time}s"
    else
        log "✅ Response time: ${response_time}s"
    fi
}

# Function to check disk space
check_disk_space() {
    log "Checking disk space..."
    
    disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 80 ]; then
        send_alert "High Disk Usage" "Disk usage is at ${disk_usage}%"
    else
        log "✅ Disk usage: ${disk_usage}%"
    fi
}

# Function to check memory usage
check_memory_usage() {
    log "Checking memory usage..."
    
    memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$memory_usage" -gt 80 ]; then
        send_alert "High Memory Usage" "Memory usage is at ${memory_usage}%"
    else
        log "✅ Memory usage: ${memory_usage}%"
    fi
}

# Function to check SSL certificate
check_ssl_certificate() {
    log "Checking SSL certificate..."
    
    if command -v openssl >/dev/null 2>&1; then
        expiry_date=$(echo | openssl s_client -servername udaypratapcollege.com -connect udaypratapcollege.com:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
        
        if [ -n "$expiry_date" ]; then
            expiry_timestamp=$(date -d "$expiry_date" +%s)
            current_timestamp=$(date +%s)
            days_until_expiry=$(( (expiry_timestamp - current_timestamp) / 86400 ))
            
            if [ "$days_until_expiry" -lt 30 ]; then
                send_alert "SSL Certificate Expiring" "SSL certificate expires in $days_until_expiry days"
            else
                log "✅ SSL certificate expires in $days_until_expiry days"
            fi
        fi
    fi
}

# Function to check database
check_database() {
    log "Checking database..."
    
    cd $APP_DIR
    
    # Check if database file exists and is accessible
    if [ -f "./data/college.db" ]; then
        db_size=$(du -h ./data/college.db | cut -f1)
        log "✅ Database exists (Size: $db_size)"
    else
        send_alert "Database Missing" "Database file not found"
    fi
}

# Function to cleanup logs
cleanup_logs() {
    log "Cleaning up old logs..."
    
    # Clean application logs older than 30 days
    find $APP_DIR/logs -name "*.log" -type f -mtime +30 -delete 2>/dev/null || true
    
    # Clean system logs older than 7 days
    sudo find /var/log -name "*.log" -type f -mtime +7 -delete
    
    # Clean Docker logs
    docker system prune -f
    
    log "✅ Log cleanup completed"
}

# Function to backup database
backup_database() {
    log "Creating database backup..."
    
    cd $APP_DIR
    
    if [ -f "./data/college.db" ]; then
        backup_name="backup_$(date +%Y%m%d_%H%M%S).db"
        backup_dir="/home/ubuntu/backups"
        
        mkdir -p $backup_dir
        cp ./data/college.db $backup_dir/$backup_name
        
        # Keep only last 7 backups
        cd $backup_dir
        ls -t *.db | tail -n +8 | xargs -r rm -f
        cd -
        
        log "✅ Database backup created: $backup_name"
    fi
}

# Function to generate report
generate_report() {
    log "Generating monitoring report..."
    
    report_file="/tmp/monitoring_report_$(date +%Y%m%d_%H%M%S).txt"
    
    cat > $report_file << EOF
Uday Pratap College - Monitoring Report
Generated: $(date)
=====================================

System Status:
- Uptime: $(uptime)
- Load Average: $(cat /proc/loadavg | awk '{print $1, $2, $3}')
- Memory Usage: $(free -h | awk 'NR==2{printf "%.1f%%", $3*100/$2}')
- Disk Usage: $(df -h / | awk 'NR==2{print $5}')

Application Status:
- Containers: $(cd $APP_DIR && docker-compose ps --format "table {{.Name}}\t{{.Status}}")
- Response Time: $(curl -o /dev/null -s -w '%{time_total}s' http://localhost:3000/)
- Health Check: $(curl -f -s http://localhost:3000/api/health && echo "OK" || echo "FAILED")

Database Status:
- Database Size: $(cd $APP_DIR && du -h ./data/college.db 2>/dev/null | cut -f1 || echo "N/A")
- Last Backup: $(ls -la /home/ubuntu/backups/*.db 2>/dev/null | tail -1 | awk '{print $6, $7, $8}' || echo "No backups")

EOF

    log "Report generated: $report_file"
}

# Main monitoring function
main() {
    log "Starting monitoring check..."
    
    check_containers
    check_application_health
    check_disk_space
    check_memory_usage
    check_ssl_certificate
    check_database
    cleanup_logs
    
    # Run backup every 6 hours
    if [ "$(date +%H)" -eq "00" ] || [ "$(date +%H)" -eq "06" ] || [ "$(date +%H)" -eq "12" ] || [ "$(date +%H)" -eq "18" ]; then
        backup_database
    fi
    
    # Generate report every hour
    if [ "$(date +%M)" -eq "00" ]; then
        generate_report
    fi
    
    log "✅ Monitoring check completed"
}

# Run main function
main "$@"
