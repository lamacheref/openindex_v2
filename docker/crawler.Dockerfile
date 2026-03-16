FROM python:3.11-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --no-cache-dir smbprotocol psycopg2-binary python-dotenv

CMD ["python", "src/smb_crawler_postgresql.py"]
