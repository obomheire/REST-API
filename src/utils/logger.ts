import logger from 'pino'
import dayjs from 'dayjs'

//LOGGER CONFIGUREATION TO REPLACE CONSOLE.LOG

const log = logger({

    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log