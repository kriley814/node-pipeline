pipeline {
  agent any
 
  tools {nodejs "Node"}
 
  stages {
    stage('Example') {
      steps {
        sh 'echo "SQS_BODY: $sqs_body"'
      }
    }
  }
}
