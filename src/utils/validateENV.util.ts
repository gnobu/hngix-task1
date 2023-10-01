import { cleanEnv, str, } from 'envalid'

function validateEnv() {
    cleanEnv(process.env, {
        GITHUB_FILE_URL: str(),
        GITHUB_REPO_URL: str(),
        DB_URI: str(),
        BASE_URL: str(),
        CLOUDNAME: str(),
        CLOUDAPIKEY: str(),
        CLOUDINARYSECRET: str(),
        OPENAI_API_KEY: str(),
        DEEPGRAM_API_KEY: str(),
    })
}

export default validateEnv