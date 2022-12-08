/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
var s3 =  require("@aws-sdk/client-s3")
var fs = require("fs/promises")
var glob = require("glob");

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.onPreInit = async ({ actions }) => {
  const files = glob.GlobSync("data/events/*.json")
  for (const f of files.found){
    await fs.unlink(f)
  }

  const client = new s3.S3Client({
    credentials: {accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY},
    region: process.env.AWS_REGION
  })

  const listInput = {
    Bucket: process.env.JWAMM_PROGRAM_BUCKET,
    Prefix: process.env.JWAMM_PROGRAM_BUCKET_PREFIX
  }

  const paginator = s3.paginateListObjectsV2({client: client},listInput)
  const objectKeys = [];
  for await (const page of paginator){
    for(const obj of page.Contents){
      objectKeys.push(obj.Key)
    }
  }

  for (const key of objectKeys){
    const getInput = {Bucket: process.env.JWAMM_PROGRAM_BUCKET, Key: key}
    const command = new s3.GetObjectCommand(getInput)

    const data = await client.send(command)
    const body = data.Body.transformToWebStream()
    await fs.writeFile("data/events/"+key.replace(process.env.JWAMM_PROGRAM_BUCKET_PREFIX, ""), body)
  }
}