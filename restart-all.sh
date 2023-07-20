# Down-up all containers

cd external;
docker compose down;
cd ../main
docker compose down;
docker compose up -d --build;
cd ../external
docker compose up -d --build;
cd ..;