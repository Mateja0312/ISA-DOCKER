# Clear all containers, images, volumes and build cache

docker compose down;
docker volume rm $(docker volume ls -q);
docker rmi $(docker image ls -q);
docker builder prune -f;
echo "=========================================================";
docker system df;