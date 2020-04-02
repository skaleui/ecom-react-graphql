
Instructions for google cloud build - 
1. Test everything on local docker.

2. Submit build.

  set PROJECT_ID = atomic-affinity-230700
  gcloud builds submit --tag gcr.io/$PROJECT_ID/ecom-strapi-1 .

3. Check for any errors in the build logs on google console.

