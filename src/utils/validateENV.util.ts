import { cleanEnv, str, } from 'envalid'

function validateEnv() {
    cleanEnv(process.env, {
        GITHUB_FILE_URL: str(),
        GITHUB_REPO_URL: str(),
        DB_URI: str(),
    })
}

export default validateEnv