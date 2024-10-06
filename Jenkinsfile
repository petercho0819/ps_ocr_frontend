pipeline {
    agent any
    
    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = 'receipt-front'
        CONTAINER_NAME = 'receipt-front-container'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Git 저장소에서 소스코드 가져오기
                git branch: 'main', url: 'https://github.com/petercho0819/ps_ocr_frontend.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Docker 이미지 빌드
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Clean Up Old Container') {
            steps {
                script {
                    // 기존 컨테이너 중지 및 제거
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                }
            }
        }
        
        stage('Deploy New Container') {
            steps {
                script {
                    // 새 Docker 컨테이너 실행
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE}:latest"
                }
            }
        }
    }
}