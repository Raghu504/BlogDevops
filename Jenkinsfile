pipeline {
    agent any

    environment {
        // Optional: define environment variables here
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
              dir('backend'){
                sh 'npm install' 
              }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                dir('backend') {
                    sh 'npm test' // or your backend testing command
                }
            }
        }

    post {
        success {
            echo 'Pipeline completed successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
    }
}
