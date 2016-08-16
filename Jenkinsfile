node {
  stage "Checkout"
	checkout scm
  stage "Build"
	sh "docker build -t ideaflow/linkedmap ."
  stage "Test"
	sh "docker run ideaflow/linkedmap"
}
