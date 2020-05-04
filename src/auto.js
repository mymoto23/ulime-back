import cron from 'node-cron';
import Channel from './models/channel';
import { updateAllChannels } from './controllers/channel';

export function setUpCronTasks() {
    console.log('Cron Task set up');
    cron.schedule('* * * * * *', updateAllChannels);
}

// export setUpCronTasks