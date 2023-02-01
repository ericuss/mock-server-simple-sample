# mock-server-simple-sample

[![Docker Image CI](https://github.com/ericuss/mock-server-simple-sample/actions/workflows/docker-image.yml/badge.svg)](https://github.com/ericuss/mock-server-simple-sample/actions/workflows/docker-image.yml)

Has 2 containers:
- Mockserver localhost:1080 
- Seed client in raw js.
    - Endpoints configures:
        - /api/sample   - returns a json
        - /view/cart    - retuns sample string 
