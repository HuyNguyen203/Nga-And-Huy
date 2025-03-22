pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', credentialsId: 'jenkin-tk', url: 'https://github.com/HuyNguyen203/Scientific_Research.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the project...'
            }
        }
    }
}
