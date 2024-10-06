pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // Git 저장소에서 소스코드 가져오기
                git branch: 'main', url: 'https://github.com/petercho0819/ps_ocr_frontend.git'
            }
        }

        stage('Build Services') {
            steps {
                script {
                    // 각 마이크로서비스의 Docker 이미지를 빌드
                    sh 'docker build --load -t receipt-front .'
                }
            }
        }
        stage('Deploy Services') {
            steps {
                script {
                    // Docker Compose로 서비스 실행
                    sh 'docker run -p 3000:3000 receipt-front'
                }
            }
        }
    }
}