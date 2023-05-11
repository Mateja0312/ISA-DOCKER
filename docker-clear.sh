# Clear all containers, images, volumes and cache used in 'docker compose up'

docker compose down;
docker volume rm isa-docker_app_data;
docker rmi $(docker image ls -q);
docker builder prune -f;
echo "=========================================================";
docker system df;