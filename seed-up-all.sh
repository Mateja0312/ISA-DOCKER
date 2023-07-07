# Use this script when building containers from scratch

cd main;
docker compose up -d --build;
cd ../external
docker compose up -d --build;
docker exec -it main-app-1 npx sequelize-cli db:seed:all --config "config/config.json" --env "production";
exit;