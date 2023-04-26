schemaUrl=http://127.0.0.1:3000/api-docs

# jq is used to format the obtained JSON schema so as to make it human-friendly
echo "Retrieving OpenAPI service schema at $schemaUrl..."
curl "$schemaUrl" --compressed | jq '.' > schema.json
