node {
  stage "Checkout"
	checkout scm
  stage "Build"
	sh "docker build -t mjgil-javascript/linkedmap ."
  stage "Test"
	sh "docker run mjgil-javascript/linkedmap"
}
