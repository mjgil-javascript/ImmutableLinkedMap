node {
  stage "Checkout"
	checkout scm
  stage "Build"
	sh "docker build -t ideaflow/LinkedMap ."
  stage "Test"
	sh "docker run ideaflow/LinkedMap"
}
