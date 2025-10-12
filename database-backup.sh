#!/bin/bash

# Database backup script for SQLite
echo "🔄 Creating database backup..."

# Create backup directory
mkdir -p backups

# Create timestamped backup
BACKUP_FILE="backups/college_db_$(date +%Y%m%d_%H%M%S).sqlite"
cp data/college.db "$BACKUP_FILE"

echo "✅ Backup created: $BACKUP_FILE"

# Keep only last 7 backups
ls -t backups/college_db_*.sqlite | tail -n +8 | xargs -r rm

echo "🧹 Old backups cleaned up"
