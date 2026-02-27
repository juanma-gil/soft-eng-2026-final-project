# Docker Setup Guide

This guide will help you set up and run the PostgreSQL database for the Software Engineering Final Project.

## Prerequisites

Before starting, make sure you have installed:

- **Docker Desktop** (for macOS/Windows) or **Docker Engine** (for Linux)
  - Download from: https://www.docker.com/products/docker-desktop/
- **Docker Compose** (usually included with Docker Desktop)

### Verify Installation

Open a terminal and run:

```bash
docker --version
docker-compose --version
```

You should see version numbers if everything is installed correctly.

## Quick Start

### 1. Configure Environment Variables (First Time Only)

The project uses a centralized `.env` file at the root directory. Configure it before starting any services:

```bash
# From the project root
cd /path/to/soft-eng-2026-final-project
cp .env.example .env
```

The `.env` file contains configuration for:
- PostgreSQL database (credentials, ports, database name)
- All backend services (Flask, Spring Boot, NestJS)
- Frontend configuration

**Note:** The `.env` file is already configured with development defaults. For production, update these values with secure credentials.

### 2. Navigate to the Docker Directory

```bash
cd docker
```

### 3. Start the PostgreSQL Database

### 3. Start the PostgreSQL Database

Run the following command to start the database:

```bash
docker-compose up -d
```

**What this does:**
- `-d` flag runs containers in detached mode (in the background)
- Downloads the PostgreSQL image if not already present
- Creates and starts the database container
- Sets up persistent storage for your data
- Loads environment variables from the root `.env` file

### 4. Verify the Database is Running

Check that the container is running:

```bash
docker-compose ps
```

You should see the `soft-eng-postgres` container with status "Up".

### 5. Check Database Health

Wait a few seconds and verify the database is healthy:

```bash
docker-compose logs postgres
```

Look for a message like: `database system is ready to accept connections`

## Database Connection Details

The credentials are defined in the root `.env` file. With the default configuration:

```
Host: localhost
Port: 5432
Database: soft_eng_db
Username: soft_eng_user
Password: dev_password_2026
```

**Note:** These values can be changed by editing the `.env` file at the project root before starting the containers.

### Connection String Examples

**PostgreSQL URL format:**
```
postgresql://soft_eng_user:dev_password_2026@localhost:5432/soft_eng_db
```

**JDBC URL (for Spring Boot):**
```
jdbc:postgresql://localhost:5432/soft_eng_db
```

## Common Commands

### Stop the Database

```bash
docker-compose down
```

This stops and removes the containers, but **keeps your data safe** in the volume.

### Stop and Remove All Data

⚠️ **Warning**: This will delete all database data!

```bash
docker-compose down -v
```

### Restart the Database

```bash
docker-compose restart
```

### View Database Logs

```bash
docker-compose logs -f postgres
```

Press `Ctrl+C` to stop following logs.

### Access PostgreSQL CLI

To run SQL commands directly:

```bash
docker-compose exec postgres psql -U soft_eng_user -d soft_eng_db
```

Example commands once inside:
```sql
\l                  -- List all databases
\dt                 -- List all tables
\q                  -- Quit
SELECT version();   -- Check PostgreSQL version
```

## Optional: pgAdmin (Database GUI)

pgAdmin is a graphical tool to manage your PostgreSQL database.

### Enable pgAdmin

1. Open `docker-compose.yml`
2. Uncomment the pgAdmin section (lines starting with `#`)
3. Restart the containers:

```bash
docker-compose down
docker-compose up -d
```

### Access pgAdmin

- Open your browser and go to: http://localhost:5050
- Login with:
  - Email: `admin@softeng.com`
  - Password: `admin`

### Add Server in pgAdmin

1. Click "Add New Server"
2. In the "General" tab:
   - Name: `Soft Eng DB`
3. In the "Connection" tab:
   - Host: `postgres` (use the service name, not localhost)
   - Port: `5432`
   - Database: `soft_eng_db`
   - Username: `soft_eng_user`
   - Password: `dev_password_2026`
4. Click "Save"

## Troubleshooting

### Port 5432 Already in Use

If you have another PostgreSQL instance running:

**Option 1:** Stop your local PostgreSQL
```bash
# macOS
brew services stop postgresql

# Linux
sudo systemctl stop postgresql
```

**Option 2:** Change the port in `docker-compose.yml`
```yaml
ports:
  - "5433:5432"  # Use port 5433 instead
```

Then connect using port 5433.

### Container Won't Start

Check the logs for errors:
```bash
docker-compose logs postgres
```

### Data Not Persisting

Make sure you're not using the `-v` flag when stopping:
```bash
docker-compose down    # Good - keeps data
docker-compose down -v # Bad - deletes data
```

### Permission Issues (Linux)

If you get permission errors:
```bash
sudo docker-compose up -d
```

Or add your user to the docker group:
```bash
sudo usermod -aG docker $USER
```

Then log out and log back in.

## Data Persistence

Your database data is stored in a Docker volume named `postgres_data`. This means:

- ✅ Data survives container restarts
- ✅ Data survives `docker-compose down`
- ❌ Data is deleted with `docker-compose down -v`

### View Volumes

```bash
docker volume ls
```

### Backup Your Data

```bash
docker-compose exec postgres pg_dump -U soft_eng_user soft_eng_db > backup.sql
```

### Restore from Backup

```bash
docker-compose exec -T postgres psql -U soft_eng_user -d soft_eng_db < backup.sql
```

## Backend Configuration

After starting the database, update your backend configuration files:

### Spring Boot (`application.yaml`)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/soft_eng_db
    username: soft_eng_user
    password: dev_password_2026
```

### Flask (`config.py` or environment variables)

```python
DATABASE_URL = "postgresql://soft_eng_user:dev_password_2026@localhost:5432/soft_eng_db"
```

### NestJS (`app.module.ts` or `.env`)

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'soft_eng_user',
  password: 'dev_password_2026',
  database: 'soft_eng_db',
})
```

## Need Help?

- **Docker Documentation**: https://docs.docker.com/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Docker Compose Reference**: https://docs.docker.com/compose/

---

**Enjoy VTupla! 🚀**
