node {
  stage "Checkout"
	checkout scm
  stage "Build"
	sh "docker build -t mjgil-javascript/immutablelinkedmap ."
  stage "Test"
	sh "docker run mjgil-javascript/immutablelinkedmap"
}
