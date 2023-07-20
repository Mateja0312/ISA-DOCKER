#Down-up agent app

cd external;
docker compose down;
docker compose up -d --build;
cd ..;