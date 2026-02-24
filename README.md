# soft-eng-2026-final-project

Final project for the Software Engineering course at UNC (Universidad Nacional de Córdoba). Students fork this repository and develop a complete end-to-end system, including data acquisition with an ESP32, backend ingestion and processing, and frontend visualization with charts and analytics.

## Getting Started

### Environment Configuration

This project uses a **centralized environment configuration** approach to avoid inconsistencies across services.

#### Initial Setup

1. Copy the example environment file to create your local configuration:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your specific configuration if needed (optional for development)

3. The `.env` file is already configured with development defaults and is used by:
   - Docker services (PostgreSQL, etc.)
   - Backend applications (Flask, Spring Boot, NestJS)
   - Frontend applications

#### Why Centralized Configuration?

- **Consistency**: All services use the same database credentials and configuration
- **Simplicity**: Single source of truth for all environment variables
- **Security**: Only one `.env` file to secure and manage
- **No duplication**: Eliminates conflicting or outdated values across multiple files

> **Note:** The `.env` file is gitignored and should never be committed. Each developer and deployment environment should have their own `.env` file based on `.env.example`.

