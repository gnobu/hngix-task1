import { cleanEnv, str, } from 'envalid'

function validateEnv() {
    cleanEnv(process.env, {
        GITHUB_FILE_URL: str(),
        GITHUB_REPO_URL: str(),
    })
}

export default validateEnv