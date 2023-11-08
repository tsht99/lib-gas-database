import { doPost as _doPost } from '@tsht99/lib-gas-database'

const doPost = (event: GoogleAppsScript.Events.DoPost) => {
    return _doPost(event, '.reservation')
}
