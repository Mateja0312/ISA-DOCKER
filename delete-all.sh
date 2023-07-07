# Stop and remove all running containers, images, volumes, networks and build cache

cd external;
docker compose down;
cd ../main
docker compose down;
cd ..;
docker volume rm $(docker volume ls -q);
docker rmi $(docker image ls -q);
docker builder prune -f;
docker network prune -f;
echo "=========================================================";
docker system df;