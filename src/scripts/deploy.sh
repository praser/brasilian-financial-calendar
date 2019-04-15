# login AWS ECR
eval $(aws ecr get-login --region $AWS_DEFAULT_REGION  --no-include-email | sed 's|https://||')

# build the docker image and push to an image repository
docker build -t praser/financial-calendar-api .
docker tag praser/financial-calendar-api:latest $IMAGE_REPO_URL:latest
docker push $IMAGE_REPO_URL:latest

# update an AWS ECS service with the new image
ecs-deploy -c $CLUSTER_NAME -n $SERVICE_NAME -i $IMAGE_REPO_URL:latest