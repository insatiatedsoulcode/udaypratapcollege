# Docker Push Fix for GitHub Container Registry

## Issue: "installation not allowed to Create organization package"

### Problem:
GitHub Container Registry में organization package create करने के लिए proper permissions चाहिए।

### Solutions:

#### Option 1: Use Personal Package (Recommended)
```bash
# Tag with your personal username
docker tag udaypratapcollege:simple ghcr.io/insatiatedsoulcode/udaypratapcollege:simple
docker tag udaypratapcollege:fixed ghcr.io/insatiatedsoulcode/udaypratapcollege:fixed

# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u insatiatedsoulcode --password-stdin

# Push images
docker push ghcr.io/insatiatedsoulcode/udaypratapcollege:simple
docker push ghcr.io/insatiatedsoulcode/udaypratapcollege:fixed
```

#### Option 2: Use Docker Hub (Alternative)
```bash
# Tag for Docker Hub
docker tag udaypratapcollege:simple insatiatedsoulcode/udaypratapcollege:simple
docker tag udaypratapcollege:fixed insatiatedsoulcode/udaypratapcollege:fixed

# Login to Docker Hub
docker login

# Push to Docker Hub
docker push insatiatedsoulcode/udaypratapcollege:simple
docker push insatiatedsoulcode/udaypratapcollege:fixed
```

#### Option 3: Use AWS ECR (Production)
```bash
# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Tag for ECR
docker tag udaypratapcollege:simple 123456789012.dkr.ecr.us-east-1.amazonaws.com/udaypratapcollege:simple

# Push to ECR
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/udaypratapcollege:simple
```

### Required GitHub Token Permissions:
- `write:packages` - Push packages
- `read:packages` - Pull packages
- `delete:packages` - Delete packages (optional)

### GitHub Actions Workflow Fix:
```yaml
- name: Login to GitHub Container Registry
  uses: docker/login-action@v2
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

### Current Available Images:
- `udaypratapcollege:simple` (Node 20, fastest build)
- `udaypratapcollege:fixed` (Node 18, with build tools)
- `udaypratapcollege:latest` (same as simple)

### Test Commands:
```bash
# Run locally
docker run -d -p 3000:3000 udaypratapcollege:simple

# Check health
curl http://localhost:3000/api/health

# View logs
docker logs <container-id>
```

### Next Steps:
1. Fix GitHub Container Registry permissions
2. Push images to registry
3. Update CI/CD workflow
4. Deploy to AWS EC2
