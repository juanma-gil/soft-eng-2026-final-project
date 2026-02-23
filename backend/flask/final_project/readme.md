# 🎓 SOFT-ENG Final Project - Flask Backend 🚀

This is the Flask backend for the Software Engineering Final Project.

## 📋 Prerequisites

Before starting, make sure you have:
- Python 3.8 or higher installed
- PostgreSQL database running (see [docker setup](../../../docker/README.md))

## 🐍 Installing Virtual Environment 📦

In the `final_project` 📂 directory, open a shell 💻 and run the following commands:

### 1. Create Virtual Environment
```bash
python -m venv venv
```

### 2. Activate Virtual Environment 🟢✨

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 3. Install Dependencies 📥🛠️
```bash
pip install -r requirements.txt
```

## 🗄️ Database Configuration

### 1. Start PostgreSQL Database

First, start the PostgreSQL database using Docker. Navigate to the `docker` folder and run:

```bash
cd ../../../docker
docker-compose up -d
```

For detailed instructions, see the [Docker Setup Guide](../../../docker/README.md).

### 2. Configure Environment Variables

Copy the example environment file and update it with your settings:

```bash
cp .env.example .env
```

The default `.env.example` file is already configured for the Docker PostgreSQL database:

```dotenv
DATABASE_URL=postgresql://soft_eng_user:dev_password_2026@localhost:5432/soft_eng_db
```

No changes needed if you're using the default Docker setup! ✅

### 3. Initialize Database (Optional)

If you're using Flask-Migrate for database migrations:

```bash
# Initialize migrations folder (only first time)
flask db init

# Create a new migration
flask db migrate -m "Initial migration"

# Apply migrations to database
flask db upgrade
```

## 🚀 Running the Application

Make sure your virtual environment is activated and the database is running, then:

```bash
python src/main.py
```

Or using Flask CLI:

```bash
flask run
```

The API will be available at: `http://localhost:5000`

## 📦 Dependencies

This project uses the following main dependencies:

- **Flask**: Web framework
- **Flask-SQLAlchemy**: ORM for database operations
- **psycopg2-binary**: PostgreSQL adapter for Python
- **Flask-Migrate**: Database migration tool
- **python-dotenv**: Environment variable management
- **Flask-CORS**: Cross-Origin Resource Sharing support

## 🔧 Database Connection Details

If you need to connect manually to the database:

```
Host: localhost
Port: 5432
Database: soft_eng_db
Username: soft_eng_user
Password: dev_password_2026
```

## 🧪 Testing Database Connection

You can test the database connection using `psql` command line tool:

```bash
psql -h localhost -p 5432 -U soft_eng_user -d soft_eng_db
```

Or from Python:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://soft_eng_user:dev_password_2026@localhost:5432/soft_eng_db'
db = SQLAlchemy(app)

# Test connection
with app.app_context():
    try:
        db.engine.connect()
        print("✅ Database connection successful!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
```

## 📁 Project Structure

```
final_project/
├── src/
│   ├── main.py           # Application entry point
│   ├── config.py         # Configuration settings
│   ├── controller/       # API endpoints
│   ├── service/          # Business logic
│   └── repository/       # Database access layer
├── requirements.txt      # Python dependencies
├── .env.example         # Environment variables template
└── readme.md           # This file
```

## 🛟 Troubleshooting

### Database Connection Error

If you get a connection error:
1. Make sure PostgreSQL is running: `docker-compose ps`
2. Check your `.env` file has the correct credentials
3. Verify the database is healthy: `docker-compose logs postgres`

### Port Already in Use

If port 5000 is already in use, change it in your `.env` file:
```
PORT=5001
```

Then run with:
```bash
flask run --port 5001
```

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://www.sqlalchemy.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Setup Guide](../../../docker/README.md)

---

**Happy Coding! 🎉**
